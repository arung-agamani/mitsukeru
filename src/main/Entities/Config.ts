import { PrimaryKey, Property, Entity } from '@mikro-orm/core';

@Entity()
export default class ConfigEntity {
  constructor(key: string, value: string, desc: string = '') {
    this.key = key;
    this.value = value;
    this.description = desc;
  }

  @PrimaryKey()
  key: string = 'foo';

  @Property()
  value: string = 'bar';

  @Property()
  description: string = '';
}
