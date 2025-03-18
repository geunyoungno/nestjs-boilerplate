import { FindUserParamBaseDto } from '#user/dto/req/user/find-user.dto';
import { type IUpdateUserBodyBaseDto, type IUpdateUserParamBaseDto } from '#user/dto/req/user/update-user.dto.type';
import { UserAttributeBaseDto } from '#user/dto/res/user/user.attribute.dto';
import { PartialType, PickType } from '@nestjs/swagger';

export class UpdateUserParamBaseDto
  extends PickType(FindUserParamBaseDto, ['userUuid'] as const)
  implements IUpdateUserParamBaseDto {}

export class UpdateUserBodyBaseDto
  extends PartialType(PickType(UserAttributeBaseDto, ['fullName'] as const))
  implements IUpdateUserBodyBaseDto {}
