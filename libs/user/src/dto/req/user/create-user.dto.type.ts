import { type IUserBaseDto, type IUserPasswordBaseDto } from '#user/dto/res/user/user.dto.type';

export interface ICreateUserBodyBaseDto extends Pick<IUserBaseDto, 'fullName' | 'email'>, IUserPasswordBaseDto {}
