import { CE_TABLE_INFO } from '#common/adaptor/database/const-enum/CE_TABLE_INFO';
import { AttributeEntity } from '#common/adaptor/database/entity/entity';
import { TDraft } from '#common/adaptor/database/repository/abstract.repository.type';
import * as column from '#common/adaptor/database/tool/column';
import { toPascal, toPluralCamel } from '#common/adaptor/database/tool/convertCase';
import { draftAttribute } from '#common/adaptor/database/tool/draft';
import { ImageEntity } from '#storage/entity/image.entity';
import { CE_USER_IMAGE_KIND } from '#user/const-enum/CE_USER_IMAGE_KIND';
import {
  IUserImageLinkageAttributeEntity,
  IUserImageLinkageRelationEntity,
} from '#user/entity/user-image-linkage.entity.type';
import { UserEntity } from '#user/entity/user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

const summary = CE_TABLE_INFO.USER_IMAGE_LINKAGE_SUMMARY;

export class UserImageLinkageAttributeEntity extends AttributeEntity implements IUserImageLinkageAttributeEntity {
  declare id: string;

  declare uuid: string;

  @Column({
    ...column.relationUuid,
    comment: [summary, `${CE_TABLE_INFO.USER_SUMMARY} uuid`].join(' - '),
    name: 'user_uuid',
  })
  userUuid!: string;

  @Column({
    ...column.uuid,
    comment: [summary, `${CE_TABLE_INFO.IMAGE_SUMMARY} uuid`].join(' - '),
    name: 'image_uuid',
  })
  imageUuid!: string;

  @Column({
    comment: [summary, '종류'].join(' - '),
    length: 32,
    name: 'kind',
    type: 'varchar',
  })
  kind!: CE_USER_IMAGE_KIND;

  @Column({
    ...column.priority,
    comment: [summary, column.priority.comment].join(' - '),
  })
  priority!: number;

  @Column({
    ...column.isDefault,
    comment: [summary, column.isDefault.comment].join(' - '),
  })
  isDefault!: boolean;

  // SECTION - meta
  declare createdAt: Date;

  declare updatedAt: Date;

  declare deletedAt: Date | null;

  declare isDeleted: boolean;

  declare createdByUserUuid: string;

  declare updatedByUserUuid: string;

  declare deletedByUserUuid: string | null;
  // !SECTION
}

@Entity({ name: `${CE_TABLE_INFO.USER_IMAGE_LINKAGE}`, engine: 'InnoDB' })
@Index('uix_uuid', ['uuid'], { unique: true })
@Index('ix_user_uuid', ['userUuid'])
class UserImageLinkage extends UserImageLinkageAttributeEntity implements IUserImageLinkageRelationEntity {
  // SECTION - relation
  @ManyToOne(toPascal(CE_TABLE_INFO.IMAGE), toPluralCamel(CE_TABLE_INFO.USER_IMAGE_LINKAGE), {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'image_uuid', referencedColumnName: 'uuid' })
  image!: ImageEntity | null;

  @ManyToOne(toPascal(CE_TABLE_INFO.USER), toPluralCamel(CE_TABLE_INFO.USER_IMAGE_LINKAGE), {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'user_uuid', referencedColumnName: 'uuid' })
  user!: UserEntity | null;
  // !SECTION

  static draft: TDraft<IUserImageLinkageAttributeEntity> = (args) => {
    const draftUserImageLinkage = {
      ...draftAttribute(args),

      userUuid: args?.userUuid ?? '',
      imageUuid: args?.imageUuid ?? '',
      kind: args?.kind ?? CE_USER_IMAGE_KIND.AVATAR,

      priority: args?.priority ?? 0,
      isDefault: args?.isDefault ?? false,
    } satisfies Omit<IUserImageLinkageAttributeEntity, 'id'>;

    return draftUserImageLinkage;
  };
}

export { UserImageLinkage as UserImageLinkageEntity };
