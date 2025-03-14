import { CreateUserBodyBaseDto } from '#user/dto/req/user/create-user.dto';
import { type ICreateUserBodyBaseDto } from '#user/dto/req/user/create-user.dto.type';

export class CreateUserBodyDto extends CreateUserBodyBaseDto implements ICreateUserBodyBaseDto {}
