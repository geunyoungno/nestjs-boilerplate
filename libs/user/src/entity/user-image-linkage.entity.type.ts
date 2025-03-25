import { type IAttributeEntity, type IRelationEntity } from '#common/adaptor/database/entity/entity.type';
import { type IImageEntity } from '#storage/entity/image.entity.type';
import { type CE_USER_IMAGE_KIND } from '#user/const-enum/CE_USER_IMAGE_KIND';
import { type IUserEntity } from '#user/entity/user.entity.type';

export interface IUserImageLinkageAttributeEntity extends IAttributeEntity {
  /** 사용자 이미지 연계 id */
  id: string;

  /** 사용자 이미지 연계 uuid */
  uuid: string;

  /** 사용자 uuid */
  userUuid: string;

  /**
   * 이미지 uuid
   */
  imageUuid: string;

  /**
   * 사용자 이미지 종류
   */
  kind: CE_USER_IMAGE_KIND;

  /**
   * 이미지 - 우선순위
   * * 숫자가 클수록 우선순위가 높음
   * * 메인 이미지에서 사용됨
   */
  priority: number;

  /** 이미지 - 기본 이미지 여부 */
  isDefault: boolean;
}

export interface IUserImageLinkageRelationEntity extends IRelationEntity {
  /** 이미지 */
  image: IImageEntity | null;

  /** 사용자 */
  user: IUserEntity | null;
}

/** 사용자 이미지 연계 */
export default interface IUserImageLinkageEntity
  extends IUserImageLinkageAttributeEntity,
    IUserImageLinkageRelationEntity {}
