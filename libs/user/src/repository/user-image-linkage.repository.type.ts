import { type TExtra } from '#common/adaptor/database/repository/abstract.repository.type';
import { type UserImageLinkageEntity } from '#user/entity/user-image-linkage.entity';
import { type IUserImageLinkageAttributeEntity } from '#user/entity/user-image-linkage.entity.type';
import { type SetRequired } from 'type-fest';
import { type InsertResult, type UpdateResult } from 'typeorm';

export interface IUserImageLinkageRepository {
  // SECTION - 단건
  /** 사용자 이미지 연계 단건 수정 */
  update(args: {
    condition: Pick<IUserImageLinkageAttributeEntity, 'uuid'> | Pick<IUserImageLinkageAttributeEntity, 'id'>;
    value: Partial<Omit<IUserImageLinkageAttributeEntity, 'id' | 'uuid'>>;
  }): Promise<Pick<UserImageLinkageEntity, 'uuid'> | Pick<UserImageLinkageEntity, 'id'>>;
  // !SECTION

  // SECTION - 다건
  /** 사용자 이미지 연계 다건 조회 */
  findMany(args: {
    condition:
      | { uuids: Array<IUserImageLinkageAttributeEntity['uuid']> }
      | { userUuids: Array<IUserImageLinkageAttributeEntity['userUuid']> }
      | Pick<IUserImageLinkageAttributeEntity, 'kind'>
      | Pick<IUserImageLinkageAttributeEntity, 'userUuid'>;
    extra?: TExtra;
  }): Promise<UserImageLinkageEntity[]>;

  /** 사용자 이미지 연계 다건 생성 */
  createMany(args: {
    value: Array<Partial<Omit<IUserImageLinkageAttributeEntity, 'id'>>>;
  }): Promise<{ uuids: Array<UserImageLinkageEntity['uuid']> }>;

  /** 사용자 이미지 연계 다건 수정 */
  updateMany(args: {
    condition: {
      kind: IUserImageLinkageAttributeEntity['kind'];
      userUuid: IUserImageLinkageAttributeEntity['userUuid'];
      withoutUuids: Array<IUserImageLinkageAttributeEntity['uuid']>;
    };
    value: Partial<Omit<IUserImageLinkageAttributeEntity, 'id' | 'uuid'>>;
  }): Promise<{ updateResult: UpdateResult }>;

  /** 사용자 이미지 연계 다건 삭제 */
  removeMany(args: {
    condition: {
      kind: IUserImageLinkageAttributeEntity['kind'];
      userUuid: IUserImageLinkageAttributeEntity['userUuid'];
      withoutUuids: Array<IUserImageLinkageAttributeEntity['uuid']>;
    };
    value?: Partial<Omit<IUserImageLinkageAttributeEntity, 'id' | 'uuid'>>;
  }): Promise<{ updateResult: UpdateResult }>;

  /** 사용자 이미지 연계 다건 upsert  */
  upsertMany(args: {
    overwrite: Array<'priority' | 'is_default'>;
    value: Array<SetRequired<Partial<Omit<IUserImageLinkageAttributeEntity, 'id'>>, 'uuid' | 'priority'>>;
  }): Promise<{ insertResult: InsertResult }>;
  // !SECTION
}
