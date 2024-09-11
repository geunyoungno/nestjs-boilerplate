import { type ICreateUserBodyDomainDto } from '#user/dto/req/user/create-user.dto.type';
import { UserDomainDto, UserPasswordDomainDto } from '#user/dto/res/user/user.dto';
import { IntersectionType, PickType } from '@nestjs/swagger';

export class CreateUserBodyDomainDto
  extends IntersectionType(PickType(UserDomainDto, ['fullName', 'email'] as const), UserPasswordDomainDto)
  implements ICreateUserBodyDomainDto {}
