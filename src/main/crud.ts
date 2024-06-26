/* eslint-disable import/prefer-default-export */
import { wrap } from '@mikro-orm/core';
import { IpcMainInvokeEvent } from 'electron';
import { EntityManager } from '@mikro-orm/sqlite';
import LostItem, { LostItemStatus } from './Entities/LostItem';
import FoundItem, { FoundItemStatus } from './Entities/FoundItem';
import { ItemType } from './preload';
import DepositItem, { DepositItemStatus } from './Entities/DepositItem';

interface BaseItemAttributes {
  name: string;
  description: string;
}

interface LostItemUpdate extends BaseItemAttributes {
  location: string;
  status: LostItemStatus;
}

interface FoundItemUpdate extends BaseItemAttributes {
  location: string;
  status: FoundItemStatus;
}

interface DepositItemUpdate extends BaseItemAttributes {
  counter: string;
  status: DepositItemStatus;
}

export async function getItem(
  event: IpcMainInvokeEvent,
  _em: EntityManager,
  type: ItemType,
  id: string,
) {
  let entity = null;
  // if (type === 'lost') {
  //   entity = LostItem;
  // }
  // if (type === 'found') {
  //   entity = FoundItem;
  // }
  // if (type === 'deposit') {
  //   entity = DepositItem;
  // }
  switch (type) {
    case 'lost':
      entity = LostItem;
      break;
    case 'found':
      entity = FoundItem;
      break;
    case 'deposit':
      entity = DepositItem;
      break;
    default:
      entity = null;
  }

  if (!entity) return 0;

  try {
    const em = _em.fork();
    const item = await em.findOneOrFail(entity, { id });
    return item;
  } catch (error) {
    console.error('Error happened on get item', error);
    return null;
  }
}

export async function editItem(
  event: IpcMainInvokeEvent,
  _em: EntityManager,
  type: ItemType,
  id: string,
  values: BaseItemAttributes,
) {
  let entity = null;
  let val = null;
  if (type === 'lost') {
    entity = LostItem;
    val = values as LostItemUpdate;
  }
  if (type === 'found') {
    entity = FoundItem;
    val = values as FoundItemUpdate;
  }
  if (type === 'deposit') {
    entity = DepositItem;
    val = values as DepositItemUpdate;
  }

  if (!entity) return 0;
  try {
    const em = _em.fork();
    const item = await em.findOneOrFail(entity, { id });
    wrap(item).assign(
      {
        ...val,
        updatedAt: new Date(),
      },
      { em },
    );
    await em.flush();

    return 1;
  } catch (error) {
    console.error('Error occured on editItem handler on ipcMain');
    console.error(error);
    return -1;
  }
}
