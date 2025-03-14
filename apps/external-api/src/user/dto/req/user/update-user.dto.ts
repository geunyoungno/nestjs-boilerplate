import { UpdateUserBodyBaseDto, UpdateUserParamBaseDto } from '#user/dto/req/user/update-user.dto';
import { type IUpdateUserBodyBaseDto, type IUpdateUserParamBaseDto } from '#user/dto/req/user/update-user.dto.type';

export class UpdateUserParamDto extends UpdateUserParamBaseDto implements IUpdateUserParamBaseDto {}

export class UpdateUserBodyDto extends UpdateUserBodyBaseDto implements IUpdateUserBodyBaseDto {}
