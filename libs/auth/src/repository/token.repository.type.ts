import { type TokenEntity } from '#auth/entity/token.entity';
import { type ITokenAttributeEntity } from '#auth/entity/token.entity.type';
import { type TExtra } from '#common/adaptor/database/repository/abstract.repository.type';
import { type UpdateResult } from 'typeorm';

export interface ITokenRepository {
  // SECTION - 단건
  /** 토큰 단건 조회 */
  find(args: {
    condition:
      | Pick<ITokenAttributeEntity, 'uuid'>
      | Pick<ITokenAttributeEntity, 'id'>
      | Pick<ITokenAttributeEntity, 'userUuid'>
      | Pick<ITokenAttributeEntity, 'status'>;
    extra?: TExtra;
  }): Promise<TokenEntity | null>;

  /** 토큰 단건 생성 */
  create(args: { value: Partial<Omit<ITokenAttributeEntity, 'id'>> }): Promise<Pick<TokenEntity, 'id' | 'uuid'>>;

  /** 토큰 단건 수정 */
  update(args: { condition: Pick<ITokenAttributeEntity, 'uuid'>; value: Partial<Omit<TokenEntity, 'id' | 'uuid'>> });
  // !SECTION

  // SECTION - 다건
  /** 토큰 다건 조회 */
  findMany(args: {
    condition: Pick<ITokenAttributeEntity, 'userUuid'> | Pick<ITokenAttributeEntity, 'status'>;
    extra?: TExtra;
  }): Promise<TokenEntity[]>;

  /** 토큰 다건 수정 */
  updateMany(args: {
    condition: {
      uuids: Array<ITokenAttributeEntity['uuid']>;
      status: ITokenAttributeEntity['status'];
    };
    value: Partial<Omit<ITokenAttributeEntity, 'id' | 'uuid'>>;
  }): Promise<{
    updateResult: UpdateResult;
  }>;
  // !SECTION
}
