import type IUserEntity from '#user/entity/user.entity.type';

export interface IUserBaseDto extends IUserAttributeBaseDto, IUserRelationBaseDto {}

export interface IUserAttributeBaseDto
  extends Pick<IUserEntity, 'uuid' | 'fullName' | 'email' | 'createdAt' | 'updatedAt'> {}

export interface IUserRelationBaseDto {}

export interface IUserPasswordBaseDto extends Pick<IUserEntity, 'password'> {}
