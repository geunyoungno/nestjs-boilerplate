import { type TExtra, type TIncludes } from '#common/adaptor/database/repository/abstract.repository.type';
import { type CE_USER_INCLUDE } from '#user/const-enum/CE_USER_INCLUDE';
import { type ISearchUserQueryBaseDto } from '#user/dto/req/user/search-user.dto.type';
import { type ISearchUserMetaBaseDto } from '#user/dto/res/user/search-user.dto.type';
import { type UserEntity } from '#user/entity/user.entity';
import { type IUserAttributeEntity } from '#user/entity/user.entity.type';
import { type FirstArrayElement } from 'type-fest/source/internal';

export interface IUserRepository {
  // SECTION - 단건
  /** 사용자 단건 조회 */
  find(args: {
    condition:
      | Pick<IUserAttributeEntity, 'uuid'>
      | Pick<IUserAttributeEntity, 'id'>
      | Pick<IUserAttributeEntity, 'email'>;
    includes?: TIncludes<CE_USER_INCLUDE>;
  }): Promise<UserEntity | null>;

  findOrFail(args: FirstArrayElement<Parameters<IUserRepository['find']>>): Promise<UserEntity>;

  /** 사용자 단건 생성 */
  create(args: {
    value: Partial<Omit<IUserAttributeEntity, 'id'>>;
  }): Promise<Pick<IUserAttributeEntity, 'id' | 'uuid'>>;

  /** 사용자 단건 수정 */
  update(args: {
    condition: Pick<IUserAttributeEntity, 'uuid'>;
    value: Partial<Omit<IUserAttributeEntity, 'id' | 'uuid'>>;
  }): Promise<Pick<UserEntity, 'uuid'>>;
  // !SECTION

  // SECTION - 다건
  /** 사용자 다건 조회 */
  findMany(args: {
    condition: { uuids: Array<IUserAttributeEntity['uuid']> };
    includes?: TIncludes<CE_USER_INCLUDE>;
  }): Promise<UserEntity[]>;
  // !SECTION

  search(args: {
    condition: ISearchUserQueryBaseDto;
    pagination: Required<Pick<ISearchUserQueryBaseDto, 'page' | 'limit'>>;
    sort?: ISearchUserQueryBaseDto['sortBy'];
    includes?: TIncludes<CE_USER_INCLUDE>;
    extra?: TExtra;
  }): Promise<{
    entities: UserEntity[];
    meta: ISearchUserMetaBaseDto;
  }>;
}
