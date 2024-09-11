import { IsPassword } from '#framework/decorator/is-password.decorator';
import { type IUserDto, type IUserPasswordDto } from '#user/dto/res/user.dto.type';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsISO8601, IsString, IsUUID } from 'class-validator';

export class UserDto implements IUserDto {
  @ApiProperty({
    description: `사용자 고유 uuid, 외부용`,
    type: 'string',
    format: 'uuid',
  })
  @IsUUID(4)
  uuid: string;

  @ApiProperty({
    description: '사용자 성명',
    type: 'string',
    maxLength: 255,
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    description: '사용자 이메일',
    type: 'string',
    format: 'email',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: '생성 시점',
    type: 'string',
    format: 'date-time',
  })
  @IsISO8601()
  createdAt: Date;

  @ApiProperty({
    description: '최근 수정 시점',
    type: 'string',
    format: 'date-time',
  })
  @IsISO8601()
  updatedAt: Date;

  constructor(args: (typeof UserDto)[keyof typeof UserDto]) {
    this.uuid = args.uuid;
    this.fullName = args.fullName;

    this.email = args.email;
    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
  }
}

export class UserPasswordDto implements IUserPasswordDto {
  @ApiProperty({
    description: '사용자 비밀번호',
    type: 'string',
    format: 'password',
    example: '',
  })
  @IsPassword()
  password!: string;
}
