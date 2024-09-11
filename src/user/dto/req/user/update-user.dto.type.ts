import { type IReadUserParamDomainDto } from '#user/dto/req/user/read-user.dto.type';
import { type IUserDomainDto } from '#user/dto/res/user/user.dto.type';

export interface IUpdateUserParamDomainDto extends IReadUserParamDomainDto {}

export interface IUpdateUserBodyDomainDto extends Partial<Pick<IUserDomainDto, 'fullName'>> {}
