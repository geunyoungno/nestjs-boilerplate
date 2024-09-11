import { UserDomainDto, UserPasswordDomainDto } from '#user/dto/res/user/user.dto';
import { type IUserDomainDto, type IUserPasswordDomainDto } from '#user/dto/res/user/user.dto.type';

export class UserDto extends UserDomainDto implements IUserDomainDto {}

export class UserPasswordDto extends UserPasswordDomainDto implements IUserPasswordDomainDto {}
