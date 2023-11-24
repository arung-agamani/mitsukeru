import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from './BaseEntity';

@Entity()
export default class Item extends BaseEntity {
  @Property()
  name!: string;

  @Property()
  type!: string;

  @Property()
  description!: string;
}
