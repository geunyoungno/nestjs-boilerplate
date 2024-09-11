import { ReadUserParamDomainDto } from '#user/dto/req/user/read-user.dto';
import { type IReadUserParamDomainDto } from '#user/dto/req/user/read-user.dto.type';

export class ReadUserParamDto extends ReadUserParamDomainDto implements IReadUserParamDomainDto {}
