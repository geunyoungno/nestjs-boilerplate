import { initDto } from '#common/shared/tool/initDto';
import isEmpty from '#common/shared/tool/isEmpty';
import { dtoManyDecorator } from '#framework/decorator/dto/dto.decorator';
import { IsPassword } from '#framework/decorator/dto/is-password.decorator';
import { UserImageLinkageAttributeBaseDto } from '#user/dto/res/user-image-linkage/user-image-linkage.attribute.dto';
import { UserAttributeBaseDto } from '#user/dto/res/user/user.attribute.dto';
import { IUserRelationBaseDto, type IUserBaseDto, type IUserPasswordBaseDto } from '#user/dto/res/user/user.dto.type';
import { IUserRelationEntity, type IUserEntity } from '#user/entity/user.entity.type';
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

export class UserRelationBaseDto implements IUserRelationBaseDto {
  @dtoManyDecorator({
    dto: () => UserImageLinkageAttributeBaseDto,
    description: '사용자 이미지 연계 목록',
    nullable: true,
  })
  imageLinkages!: UserImageLinkageAttributeBaseDto[] | null;

  constructor(args: IUserRelationEntity) {
    this.imageLinkages = isEmpty(args.userImageLinkages)
      ? null
      : args.userImageLinkages.map((imageLinkage) => new UserImageLinkageAttributeBaseDto(imageLinkage));
  }
}

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
