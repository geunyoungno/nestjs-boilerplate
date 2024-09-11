import type IUserEntity from '#user/entity/user.entity.type';

export interface IUserDomainDto extends IUserAttributeDomainDto, IUserRelationDomainDto {}

export interface IUserAttributeDomainDto
  extends Pick<IUserEntity, 'uuid' | 'fullName' | 'email' | 'createdAt' | 'updatedAt'> {}

export interface IUserRelationDomainDto {}

export interface IUserPasswordDomainDto extends Pick<IUserEntity, 'password'> {}
