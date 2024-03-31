import { Entity, Property, PrimaryKey } from '@mikro-orm/core';

export type DepositItemStatus = 'stored' | 'returned';

@Entity()
export default class DepositItem {
  constructor(
    name: string,
    type: string,
    desc: string,
    counter: string,
    ownerName: string,
    ownerContact: string,
  ) {
    this.name = name;
    this.type = type;
    this.counter = counter;
    this.description = desc;
    this.ownerName = ownerName;
    this.ownerContact = ownerContact;
  }

  @PrimaryKey()
  id!: number;

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

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();

  @Property()
  deleted: boolean = false;

  @Property({ nullable: true })
  deletedAt!: Date;
}
