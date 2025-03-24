import { FindManyUserParamBaseDto, FindManyUserQueryBaseDto } from '#user/dto/req/user/find-many-user.dto';
import {
  type IFindManyUserParamBaseDto,
  type IFindManyUserQueryBaseDto,
} from '#user/dto/req/user/find-many-user.dto.type';

export class FindManyUserParamDto extends FindManyUserParamBaseDto implements IFindManyUserParamBaseDto {}

export class FindManyUserQueryDto extends FindManyUserQueryBaseDto implements IFindManyUserQueryBaseDto {}
