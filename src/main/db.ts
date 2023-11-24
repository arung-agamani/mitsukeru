import { MikroORM } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/sqlite';
import { ipcMain } from 'electron';
import { BaseEntity } from './Entities/BaseEntity';
import Item from './Entities/Item';

export const DI = {} as {
  orm: MikroORM;
  em: EntityManager;
};
export const initDb = async () => {
  const orm = await MikroORM.init({
    type: 'sqlite',
    dbName: 'test.db',
    debug: true,
    entities: [BaseEntity, Item],
  });
  const em = orm.em as EntityManager;
  DI.orm = orm;
  DI.em = em;
};

ipcMain.on('db', (event, type, value) => {
  if (type === 'lost') {
    console.log(value);
  }
});
