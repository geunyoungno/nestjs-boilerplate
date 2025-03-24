import { CE_TABLE_INFO } from '#common/adaptor/database/const-enum/CE_TABLE_INFO';
import { FindUserQueryDto } from '#external-api/user/dto/req/user/find-user.dto';
import { uuidManyDecorator } from '#framework/decorator/dto/uuid.decorator';
import { IFindManyUserQueryBaseDto, type IFindManyUserParamBaseDto } from '#user/dto/req/user/find-many-user.dto.type';
import { PickType } from '@nestjs/swagger';

export class FindManyUserParamBaseDto implements IFindManyUserParamBaseDto {
  @uuidManyDecorator({
    description: `${CE_TABLE_INFO.USER_SUMMARY}`,
    required: false,
  })
  userUuids?: IFindManyUserParamBaseDto['userUuids'];
}

export class FindManyUserQueryBaseDto
  extends PickType(FindUserQueryDto, ['includes'] as const)
  implements IFindManyUserQueryBaseDto {}
