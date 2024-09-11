import type IUserEntity from '#user/entity/user.entity.type';

export interface IUserDto extends Pick<IUserEntity, 'uuid' | 'fullName' | 'email' | 'createdAt' | 'updatedAt'> {}

export interface IUserPasswordDto extends Pick<IUserEntity, 'password'> {}
