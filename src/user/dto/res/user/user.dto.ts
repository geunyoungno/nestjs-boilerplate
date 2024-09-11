import { IsPassword } from '#framework/decorator/is-password.decorator';
import { UserAttributeDomainDto } from '#user/dto/res/user/user.attribute.dto';
import { type IUserDomainDto, type IUserPasswordDomainDto } from '#user/dto/res/user/user.dto.type';
import type IUserEntity from '#user/entity/user.entity.type';
import { ApiProperty } from '@nestjs/swagger';

export class UserDomainDto extends UserAttributeDomainDto implements IUserDomainDto {
  constructor(args: IUserEntity) {
    super(args);
  }
}

export class UserPasswordDomainDto implements IUserPasswordDomainDto {
  @ApiProperty({
    description: '사용자 비밀번호',
    type: 'string',
    format: 'password',
    example: '',
  })
  @IsPassword()
  password!: string;
}
