import { CE_TABLE_INFO } from '#common/adaptor/database/const-enum/CE_TABLE_INFO';
import { uuidDecorator } from '#framework/decorator/dto/uuid.decorator';
import { type IFindUserParamBaseDto } from '#user/dto/req/user/find-user.dto.type';

export class FindUserParamBaseDto implements IFindUserParamBaseDto {
  @uuidDecorator({ description: `${CE_TABLE_INFO.USER_SUMMARY}`, required: true })
  userUuid!: string;
}
