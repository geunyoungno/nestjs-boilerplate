import { CreateUserBodyDomainDto } from '#user/dto/req/user/create-user.dto';
import { type ICreateUserBodyDomainDto } from '#user/dto/req/user/create-user.dto.type';

export class CreateUserBodyDto extends CreateUserBodyDomainDto implements ICreateUserBodyDomainDto {}
