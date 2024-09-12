import { type IUserDomainDto, type IUserPasswordDomainDto } from '#user/dto/res/user/user.dto.type';

export interface ICreateUserBodyDomainDto extends Pick<IUserDomainDto, 'fullName' | 'email'>, IUserPasswordDomainDto {}
