import { type ITokenEntity } from '#auth/entity/token.entity.type';
import { type IAttributeEntity, type IRelationEntity } from '#common/adaptor/database/entity/entity.type';

export interface IUserAttributeEntity extends IAttributeEntity {
  /** 사용자 id, 내부용 */
  id: string;

  /** 사용자 고유 uuid, 외부용 */
  uuid: string;

  /**
   * 이메일
   * email 최대 254 가 RFC3696 에 정의된 스펙
   * @see https://stackoverflow.com/questions/386294/what-is-the-maximum-length-of-a-valid-email-address
   * @maxLength 255
   */
  email: string;

  /** 비밀번호 */
  password: string;

  /** 사용자 성명 */
  fullName: string;

  /** 생성 시점 */
  createdAt: Date;

  /** 최근 수정 시점 */
  updatedAt: Date;
}

export interface IUserRelationEntity extends IRelationEntity {
  /** 토큰 목록 */
  tokens: ITokenEntity[];
}

/** 사용자 */
export interface IUserEntity extends IUserAttributeEntity, IUserRelationEntity {}
