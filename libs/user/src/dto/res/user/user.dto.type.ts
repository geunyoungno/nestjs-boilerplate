import { type IUserAttributeEntity, type IUserRelationEntity } from '#user/entity/user.entity.type';

export interface IUserAttributeBaseDto
  extends Pick<IUserAttributeEntity, 'uuid' | 'fullName' | 'email' | 'createdAt' | 'updatedAt'> {}

export interface IUserPasswordBaseDto extends Pick<IUserAttributeEntity, 'password'> {}

export interface IUserRelationBaseDto extends IUserRelationEntity {}

export interface IUserBaseDto extends IUserAttributeBaseDto, IUserRelationBaseDto {}
