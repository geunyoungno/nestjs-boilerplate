import { CE_TABLE_INFO } from '#common/adaptor/database/const-enum/CE_TABLE_INFO';
import { CommonDto } from '#common/shared/dto/common.dto';
import { type IUserAttributeBaseDto } from '#user/dto/res/user/user.dto.type';
import { type IUserAttributeEntity } from '#user/entity/user.entity.type';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength } from 'class-validator';

const summary = CE_TABLE_INFO.USER_SUMMARY;

export class UserAttributeBaseDto
  extends PickType(CommonDto, ['uuid', 'createdAt', 'updatedAt'] as const)
  implements IUserAttributeBaseDto
{
  @ApiProperty({
    description: `${summary} 성명`,
    type: 'string',
    maxLength: 255,
  })
  @IsString()
  @MaxLength(255)
  fullName: string;

  @ApiProperty({
    description: `${summary} 이메일`,
    type: 'string',
    format: 'email',
  })
  @IsEmail()
  email: string;

  constructor(args: IUserAttributeEntity) {
    super(args);

    this.uuid = args.uuid;

    this.fullName = args.fullName;
    this.email = args.email;

    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
  }
}
