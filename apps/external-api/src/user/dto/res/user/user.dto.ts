import { UserBaseDto, UserPasswordBaseDto } from '#user/dto/res/user/user.dto';
import { type IUserBaseDto, type IUserPasswordBaseDto } from '#user/dto/res/user/user.dto.type';

export class UserDto extends UserBaseDto implements IUserBaseDto {}

export class UserPasswordDto extends UserPasswordBaseDto implements IUserPasswordBaseDto {}
