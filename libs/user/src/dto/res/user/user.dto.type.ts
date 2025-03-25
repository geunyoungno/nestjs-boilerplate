import { type IUserImageLinkageBaseDto } from '#user/dto/res/user-image-linkage/user-image-linkage.dto.type';
import { type IUserAttributeEntity } from '#user/entity/user.entity.type';

export interface IUserAttributeBaseDto
  extends Pick<IUserAttributeEntity, 'uuid' | 'fullName' | 'email' | 'createdAt' | 'updatedAt'> {}

export interface IUserPasswordBaseDto extends Pick<IUserAttributeEntity, 'password'> {}

export interface IUserRelationBaseDto {
  /** 사용자 이미지 연계 목록 */
  imageLinkages: IUserImageLinkageBaseDto[] | null;
}

export interface IUserBaseDto extends IUserAttributeBaseDto, IUserRelationBaseDto {}
