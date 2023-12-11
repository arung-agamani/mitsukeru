import { MikroORM } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/sqlite';
import { app, ipcMain } from 'electron';
import fs from 'fs-extra';
import path from 'path';
import xlsx from 'xlsx';
import axios from 'axios';
import { editItem, getItem } from './crud';
import { BaseEntity } from './Entities/BaseEntity';
import Item from './Entities/Item';
import LostItem from './Entities/LostItem';
import FoundItem from './Entities/FoundItem';
import ConfigEntity from './Entities/Config';

xlsx.set_fs(fs);

const USER_DATA_PATH = path.resolve(app.getPath('documents'), app.getName());

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
};
export const initDb = async () => {
  const orm = await MikroORM.init({
    type: 'sqlite',
    dbName: 'test.db',
    debug: true,
    entities: [BaseEntity, Item, LostItem, FoundItem, ConfigEntity],
  });
  const em = orm.em as EntityManager;
  DI.orm = orm;
  DI.em = em;
  // await orm.schema.refreshDatabase();
  // await orm.schema.execute('DROP TABLE `config_entity`');
  await orm.schema.updateSchema();
  fs.ensureDirSync(path.resolve(app.getPath('documents'), app.getName()));
};

interface LostItemData {
  name: string;
  type: string;
  description: string;
  location: string;
  imageData: string;
}

interface FoundItemData {
  name: string;
  type: string;
  description: string;
  location: string;
  imageData: string;
}

type ItemType = 'lost' | 'found' | 'inventory';

ipcMain.on('db', async (event, type: ItemType, value) => {
  if (type === 'lost') {
    const {
      name,
      type: itemType,
      description,
      location,
      imageData,
    } = value as LostItemData;
    const lostItem = new LostItem(name, itemType, description, location);
    const em = DI.em.fork();
    await em.persistAndFlush(lostItem);

    const imageb64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    const buf = Buffer.from(imageb64Data, 'base64');
    fs.writeFile(
      path.resolve(
        app.getPath('documents'),
        app.getName(),
        `${lostItem.id}.png`,
      ),
      buf,
    );

    event.reply('lost', 'Item successfully added to lost item bin');
  } else if (type === 'found') {
    const {
      name,
      type: itemType,
      description,
      location,
      imageData,
    } = value as FoundItemData;
    const foundItem = new FoundItem(name, itemType, description, location);
    const em = DI.em.fork();
    await em.persistAndFlush(foundItem);
    const imageb64Data = imageData.replace(/^data:image\/\w+;base64,/, '');
    const buf = Buffer.from(imageb64Data, 'base64');
    fs.writeFile(
      path.resolve(
        app.getPath('documents'),
        app.getName(),
        `${foundItem.id}.png`,
      ),
      buf,
    );

    event.reply('found', 'Item successfully added to found item bin');
  }
});

ipcMain.handle('db-search', async (event, type: ItemType) => {
  if (type === 'lost') {
    const em = DI.em.fork();
    const lostItems = await em.find(
      LostItem,
      {},
      {
        fields: [
          'name',
          'type',
          'description',
          'location',
          'createdAt',
          'updatedAt',
          'status',
        ],
      },
    );
    return lostItems;
  }
  if (type === 'found') {
    const em = DI.em.fork();
    const foundItems = await em.find(
      FoundItem,
      {},
      {
        fields: [
          'name',
          'type',
          'description',
          'location',
          'createdAt',
          'updatedAt',
          'status',
        ],
      },
    );
    return foundItems;
  }
  return [];
});

ipcMain.handle('image-get', async (event, type: ItemType, id: string) => {
  const filePath = path.resolve(USER_DATA_PATH, `${id}.png`);
  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath);
    return data.toString('base64');
  }

  return null;
});

ipcMain.handle('db-edit', async (event, type, id, values) =>
  editItem(event, DI.em, type, id, values),
);

ipcMain.handle('db-get', async (event, type, id) =>
  getItem(event, DI.em, type, id),
);

ipcMain.handle('export', async () => {
  const em = DI.em.fork();
  const allLostItems = await em.find(LostItem, {});
  const allFoundItems = await em.find(FoundItem, {});
  // ensure export file exists
  const docsPath = path.resolve(USER_DATA_PATH, 'data.xlsx');
  fs.ensureFileSync(docsPath);

  // init workbook
  const wb = xlsx.utils.book_new();
  const lostWs = xlsx.utils.sheet_new();
  const foundWs = xlsx.utils.sheet_new();
  // safe workbook
  xlsx.utils.book_append_sheet(wb, lostWs, 'Lost Items');
  xlsx.utils.book_append_sheet(wb, foundWs, 'Found Items');
  xlsx.utils.sheet_add_json(lostWs, allLostItems);
  xlsx.utils.sheet_add_json(foundWs, allFoundItems);
  xlsx.writeFileXLSX(wb, docsPath);

  const promiseArr = [];
  const returnData = {} as {
    remoteSuccess: boolean;
    lost: LostItem[];
    found: FoundItem[];
  };
  promiseArr.push(
    axios.post('http://localhost:3000/items/data', {
      type: 'lostItems',
      data: allLostItems,
    }),
    axios.post('http://localhost:3000/items/data', {
      type: 'foundItems',
      data: allFoundItems,
    }),
  );
  try {
    await Promise.all(promiseArr);
    // res.forEach((r) => console.log(r));
    returnData.remoteSuccess = true;
  } catch (error) {
    console.error(`Error happened when syncing with remote`);
    console.error(error);
    returnData.remoteSuccess = false;
  }

  await em.upsert(ConfigEntity, {
    key: 'EXPORT_DATA_PATH',
    value: docsPath,
  });

  returnData.lost = allLostItems;
  returnData.found = allFoundItems;
  return returnData;
});

ipcMain.handle('import', async () => {
  const promiseArr = [];
  promiseArr.push(
    axios.get('http://localhost:3000/items/data', {
      params: {
        type: 'lostItems',
      },
    }),
    axios.get('http://localhost:3000/items/data', {
      params: {
        type: 'foundItems',
      },
    }),
  );
  try {
    const [{ data: lostItemData }, { data: foundItemData }] =
      await Promise.all(promiseArr);
    const em = DI.em.fork();
    await em.upsertMany(LostItem, lostItemData);
    await em.upsertMany(FoundItem, foundItemData);
    return {
      success: true,
      message: 'Synced',
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: 'Something went wrong',
    };
  }
});

ipcMain.handle('config-get', async () => {
  const em = DI.em.fork();
  const allConfigs = await em.find(ConfigEntity, {});
  return {
    configs: allConfigs,
  };
});
