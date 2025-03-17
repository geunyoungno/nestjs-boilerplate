import { type IAttributeEntity } from '#common/adaptor/database/entity/entity.type';
import * as column from '#common/adaptor/database/tool/column';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class AttributeEntity implements IAttributeEntity {
  // SECTION - primary
  @PrimaryGeneratedColumn(...column.pk)
  id!: string;

  @Column({ ...column.uuid })
  uuid!: string;
  // !SECTION

  // SECTION - meta
  @Column({ ...column.createdAt })
  createdAt!: Date;

  @Column({ ...column.updatedAt })
  updatedAt!: Date;

  @Column({ ...column.deletedAt })
  deletedAt!: Date | null;

  @Column({ ...column.isDeleted })
  isDeleted!: boolean;

  @Column({ ...column.createdByUserUuid })
  createdByUserUuid!: string;

  @Column({ ...column.updatedByUserUuid })
  updatedByUserUuid!: string;

  @Column({ ...column.deletedByUserUuid })
  deletedByUserUuid!: string | null;
  // !SECTION
}
