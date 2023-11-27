import { Entity, Property } from '@mikro-orm/core';
import Item from './Item';

@Entity()
export default class LostItem extends Item {
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
  }

  @Property()
  location!: string;
}
