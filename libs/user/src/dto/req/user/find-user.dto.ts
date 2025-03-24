import { CE_TABLE_INFO } from '#common/adaptor/database/const-enum/CE_TABLE_INFO';
import { enumManyDecorator } from '#framework/decorator/dto/enum.decorator';
import { uuidDecorator } from '#framework/decorator/dto/uuid.decorator';
import { CE_USER_INCLUDE, userIncludeDescriptions } from '#user/const-enum/CE_USER_INCLUDE';
import { IFindUserQueryBaseDto, type IFindUserParamBaseDto } from '#user/dto/req/user/find-user.dto.type';

export class FindUserParamBaseDto implements IFindUserParamBaseDto {
  @uuidDecorator({ description: `${CE_TABLE_INFO.USER_SUMMARY}`, required: true })
  userUuid!: string;
}

export class FindUserQueryBaseDto implements IFindUserQueryBaseDto {
  @enumManyDecorator({
    enum: Object.values(CE_USER_INCLUDE),
    description: userIncludeDescriptions.join('\n'),
    required: false,
  })
  includes?: CE_USER_INCLUDE[];
}
