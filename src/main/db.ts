import { MikroORM } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/sqlite';
import { app, ipcMain } from 'electron';
import fs from 'fs-extra';
import path from 'path';
import { BaseEntity } from './Entities/BaseEntity';
import Item from './Entities/Item';
import LostItem from './Entities/LostItem';

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
    entities: [BaseEntity, Item, LostItem],
  });
  const em = orm.em as EntityManager;
  DI.orm = orm;
  DI.em = em;
  // await orm.schema.refreshDatabase();
  fs.ensureDirSync(path.resolve(app.getPath('documents'), app.getName()));
};

interface LostItemData {
  name: string;
  type: string;
  description: string;
  location: string;
  imageData: string;
}

type ItemType = 'lost' | 'found' | 'inventory';

ipcMain.on('db', async (event, type, value) => {
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
  }
});

ipcMain.handle('db-search', async (event, type: ItemType) => {
  if (type === 'lost') {
    const em = DI.em.fork();
    const lostItems = await em.find(
      LostItem,
      {},
      {
        fields: ['name', 'type', 'description', 'location'],
      },
    );
    return lostItems;
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
