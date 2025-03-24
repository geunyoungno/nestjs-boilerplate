import { FindUserParamBaseDto, FindUserQueryBaseDto } from '#user/dto/req/user/find-user.dto';
import { type IFindUserParamBaseDto, type IFindUserQueryBaseDto } from '#user/dto/req/user/find-user.dto.type';

export class FindUserParamDto extends FindUserParamBaseDto implements IFindUserParamBaseDto {}

export class FindUserQueryDto extends FindUserQueryBaseDto implements IFindUserQueryBaseDto {}
