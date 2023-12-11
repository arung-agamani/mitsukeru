import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

export type DepositItemStatus = 'stored' | 'returned';

@Entity()
export default class DepositItem extends BaseEntity {
  @Property()
  name!: string;

  @Property()
  type!: string;

  @Property()
  counter!: string;

  @Property()
  description: string = '';

  @Property()
  ownerName: string = '';

  @Property()
  ownerContact: string = '';

  @Property()
  status: DepositItemStatus = 'stored';
}
