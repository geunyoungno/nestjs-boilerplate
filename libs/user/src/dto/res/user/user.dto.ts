import { IsPassword } from '#framework/decorator/dto/is-password.decorator';
import { UserAttributeBaseDto } from '#user/dto/res/user/user.attribute.dto';
import { type IUserBaseDto, type IUserPasswordBaseDto } from '#user/dto/res/user/user.dto.type';
import type IUserEntity from '#user/entity/user.entity.type';
import { ApiProperty } from '@nestjs/swagger';

export class UserBaseDto extends UserAttributeBaseDto implements IUserBaseDto {
  constructor(args: IUserEntity) {
    super(args);
  }
}

export class UserPasswordBaseDto implements IUserPasswordBaseDto {
  @ApiProperty({
    description: '사용자 비밀번호',
    type: 'string',
    format: 'password',
    example: '',
  })
  @IsPassword()
  password!: string;
}
