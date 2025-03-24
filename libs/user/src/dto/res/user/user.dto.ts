import { initDto } from '#common/shared/tool/initDto';
import { IsPassword } from '#framework/decorator/dto/is-password.decorator';
import { UserAttributeBaseDto } from '#user/dto/res/user/user.attribute.dto';
import { IUserRelationBaseDto, type IUserBaseDto, type IUserPasswordBaseDto } from '#user/dto/res/user/user.dto.type';
import { type IUserEntity } from '#user/entity/user.entity.type';
import { ApiProperty, IntersectionType } from '@nestjs/swagger';

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

export class UserRelationBaseDto implements IUserRelationBaseDto {}

export class UserBaseDto extends IntersectionType(UserAttributeBaseDto, UserRelationBaseDto) implements IUserBaseDto {
  constructor(args: IUserEntity) {
    super(args);

    initDto<UserBaseDto, IUserEntity>({
      thisDto: this,
      parentDtos: [UserAttributeBaseDto, UserRelationBaseDto],
      entity: args,
    });
  }
}
