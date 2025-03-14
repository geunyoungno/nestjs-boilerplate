import { type IReadUserParamBaseDto } from '#user/dto/req/user/read-user.dto.type';
import { type IUserBaseDto } from '#user/dto/res/user/user.dto.type';

export interface IUpdateUserParamBaseDto extends IReadUserParamBaseDto {}

export interface IUpdateUserBodyBaseDto extends Partial<Pick<IUserBaseDto, 'fullName'>> {}
