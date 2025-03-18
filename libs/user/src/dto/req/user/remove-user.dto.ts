import { FindUserParamBaseDto } from '#user/dto/req/user/find-user.dto';
import { type IRemoveUserParamBaseDto } from '#user/dto/req/user/remove-user.dto.type';
import { PickType } from '@nestjs/swagger';

export class RemoveUserParamBaseDto
  extends PickType(FindUserParamBaseDto, ['userUuid'] as const)
  implements IRemoveUserParamBaseDto {}
