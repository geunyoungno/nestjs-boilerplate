import { type ICreateUserBodyBaseDto } from '#user/dto/req/user/create-user.dto.type';
import { UserBaseDto, UserPasswordBaseDto } from '#user/dto/res/user/user.dto';
import { IntersectionType, PickType } from '@nestjs/swagger';

export class CreateUserBodyBaseDto
  extends IntersectionType(PickType(UserBaseDto, ['fullName', 'email'] as const), UserPasswordBaseDto)
  implements ICreateUserBodyBaseDto {}
