import { type IUserDto, type IUserPasswordDto } from '#user/dto/res/user.dto.type';

export interface ICreateUserBodyDto extends Pick<IUserDto, 'fullName' | 'email'>, IUserPasswordDto {}
