import { type IFindUserParamBaseDto } from '#user/dto/req/user/find-user.dto.type';
import { type IUserBaseDto } from '#user/dto/res/user/user.dto.type';

export interface IUpdateUserParamBaseDto extends Pick<IFindUserParamBaseDto, 'userUuid'> {}

export interface IUpdateUserBodyBaseDto extends Partial<Pick<IUserBaseDto, 'fullName'>> {}
