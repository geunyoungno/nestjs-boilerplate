import { type IAttributeEntity } from '#common/adaptor/database/entity/entity.type';
import * as column from '#common/adaptor/database/tool/column';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class AttributeEntity implements IAttributeEntity {
  @PrimaryGeneratedColumn(...column.id)
  id!: string;

  @Column({ ...column.uuid })
  uuid!: string;
}
