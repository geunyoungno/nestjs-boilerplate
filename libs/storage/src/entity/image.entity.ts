import { CE_TABLE_INFO } from '#common/adaptor/database/const-enum/CE_TABLE_INFO';
import { AttributeEntity } from '#common/adaptor/database/entity/entity';
import { TDraft } from '#common/adaptor/database/repository/abstract.repository.type';
import { toCamel, toPascal } from '#common/adaptor/database/tool/convertCase';
import { draftAttribute } from '#common/adaptor/database/tool/draft';
import { IImageRelationEntity, type IImageAttributeEntity } from '#storage/entity/image.entity.type';
import { UserImageLinkageEntity } from '#user/entity/user-image-linkage.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';

const summary = CE_TABLE_INFO.IMAGE_SUMMARY;

export class ImageAttributeEntity extends AttributeEntity implements IImageAttributeEntity {
  declare id: string;

  declare uuid: string;

  @Column({
    comment: [summary, '원본 이미지 이름'].join(' - '),
    length: 255,
    name: 'original_name',
    type: 'varchar',
  })
  originalName!: string;

  @Column({
    comment: [summary, '확장자'].join(' - '),
    length: 255,
    name: 'extension',
    type: 'varchar',
  })
  extension!: string;

  @Column({
    comment: [summary, '파일 크기 * 바이트 단위'].join(' - '),
    default: 0,
    name: 'size',
    type: 'int',
    unsigned: true,
  })
  size!: number;

  @Column({
    comment: [summary, '해상도 가로, 너비'].join(' - '),
    default: null,
    name: 'width',
    nullable: true,
    type: 'int',
    unsigned: true,
  })
  width!: number | null;

  @Column({
    comment: [summary, '해상도 세로, 높이'].join(' - '),
    default: null,
    name: 'height',
    nullable: true,
    type: 'int',
    unsigned: true,
  })
  height!: number | null;

  @Column({
    comment: [summary, '저장 경로'].join(' - '),
    length: 255,
    name: 'storage_path',
    type: 'varchar',
  })
  storagePath!: string;

  @Column({
    comment: [summary, '썸네일 저장 경로'].join(' - '),
    default: null,
    length: 255,
    name: 'thumbnail_storage_path',
    nullable: true,
    type: 'varchar',
  })
  thumbnailStoragePath!: string | null;

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

@Entity({ name: CE_TABLE_INFO.IMAGE, engine: 'InnoDB' })
@Index('uix_uuid', ['uuid'], { unique: true })
class Image extends ImageAttributeEntity implements IImageRelationEntity {
  // SECTION - relation
  @OneToMany(toPascal(CE_TABLE_INFO.USER_IMAGE_LINKAGE), toCamel(CE_TABLE_INFO.IMAGE), {
    createForeignKeyConstraints: false,
  })
  userImageLinkages!: UserImageLinkageEntity[];
  // !SECTION

  static draft: TDraft<IImageAttributeEntity> = (args) => {
    const draftImage = {
      ...draftAttribute(args),

      originalName: args?.originalName ?? '',
      extension: args?.extension ?? '',
      size: args?.size ?? 0,
      width: args?.width ?? null,
      height: args?.height ?? null,
      storagePath: args?.storagePath ?? '',
      thumbnailStoragePath: args?.thumbnailStoragePath ?? null,
    } satisfies Omit<IImageAttributeEntity, 'id'>;

    return draftImage;
  };
}

export { Image as ImageEntity };
