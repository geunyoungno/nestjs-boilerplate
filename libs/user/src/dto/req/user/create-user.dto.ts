import { type ICreateUserBodyBaseDto } from '#user/dto/req/user/create-user.dto.type';
import { UserAttributeBaseDto } from '#user/dto/res/user/user.attribute.dto';
import { UserPasswordBaseDto } from '#user/dto/res/user/user.dto';
import { IntersectionType, PickType } from '@nestjs/swagger';

export class CreateUserBodyBaseDto
  extends IntersectionType(PickType(UserAttributeBaseDto, ['fullName', 'email'] as const), UserPasswordBaseDto)
  implements ICreateUserBodyBaseDto {}
