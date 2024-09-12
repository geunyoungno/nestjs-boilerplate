import { UpdateUserBodyDomainDto, UpdateUserParamDomainDto } from '#user/dto/req/user/update-user.dto';
import { type IUpdateUserBodyDomainDto, type IUpdateUserParamDomainDto } from '#user/dto/req/user/update-user.dto.type';

export class UpdateUserParamDto extends UpdateUserParamDomainDto implements IUpdateUserParamDomainDto {}

export class UpdateUserBodyDto extends UpdateUserBodyDomainDto implements IUpdateUserBodyDomainDto {}
