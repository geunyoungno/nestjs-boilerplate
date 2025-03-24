import { type CE_TOKEN_STATUS } from '#auth/const-enum/CE_TOKEN_STATUS';
import { type IAttributeEntity, type IRelationEntity } from '#common/adaptor/database/entity/entity.type';
import { type IUserEntity } from '#user/entity/user.entity.type';

export interface ITokenAttributeEntity extends IAttributeEntity {
  /** 토큰 id, 내부용 */
  id: string;

  /** 토큰 uuid, 외부용 */
  uuid: string;

  /** 사용자 uuid */
  userUuid: string;

  /** 갱신전 토큰 uuid */
  beforeTokenUuid: string | null;

  /** 토큰 상태 */
  status: CE_TOKEN_STATUS;

  /** 리프레시 토큰 */
  refreshToken: string;

  /** 토큰 만료 시점 */
  expiredAt: Date;
}

export interface ITokenRelationEntity extends IRelationEntity {
  /** 사용자 */
  user: IUserEntity | null;
}

/** 토큰 */
export interface ITokenEntity extends ITokenAttributeEntity, ITokenRelationEntity {}
