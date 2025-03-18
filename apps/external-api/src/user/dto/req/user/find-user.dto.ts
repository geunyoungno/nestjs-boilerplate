import { FindUserParamBaseDto } from '#user/dto/req/user/find-user.dto';
import { type IFindUserParamBaseDto } from '#user/dto/req/user/find-user.dto.type';

export class FindUserParamDto extends FindUserParamBaseDto implements IFindUserParamBaseDto {}
