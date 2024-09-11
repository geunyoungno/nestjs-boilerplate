import { type ICreateUserBodyDto } from '#user/dto/req/create-user.dto.type';
import { UserDto, UserPasswordDto } from '#user/dto/res/user.dto';
import { IntersectionType, PickType } from '@nestjs/swagger';

export class CreateUserBodyDto
  extends IntersectionType(PickType(UserDto, ['fullName', 'email'] as const), UserPasswordDto)
  implements ICreateUserBodyDto {}
