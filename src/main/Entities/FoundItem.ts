import { Entity, Property } from '@mikro-orm/core';
import Item from './Item';

export type FoundItemStatus = 'reported' | 'claimed';

@Entity()
export default class FoundItem extends Item {
  constructor(
    name: string,
    type: string,
    description: string,
    location: string,
  ) {
    super();
    this.name = name;
    this.type = type;
    this.description = description;
    this.location = location;
    const date = new Date();
    this.createdAt = date;
    this.updatedAt = date;
    this.status = 'reported';
  }

  @Property()
  location!: string;

  @Property()
  status!: FoundItemStatus;
}
