import { initDto } from '#common/shared/tool/initDto';
import { UserImageLinkageAttributeBaseDto } from '#user/dto/res/user-image-linkage/user-image-linkage.attribute.dto';
import { type IUserImageLinkageBaseDto } from '#user/dto/res/user-image-linkage/user-image-linkage.dto.type';
import type IUserImageLinkageEntity from '#user/entity/user-image-linkage.entity.type';
import { IntersectionType } from '@nestjs/swagger';

export class UserImageLinkageBaseDto
  extends IntersectionType(UserImageLinkageAttributeBaseDto)
  implements IUserImageLinkageBaseDto
{
  constructor(args: IUserImageLinkageEntity) {
    super(args);

    initDto<UserImageLinkageBaseDto, IUserImageLinkageEntity>({
      thisDto: this,
      parentDtos: [UserImageLinkageAttributeBaseDto],
      entity: args,
    });
  }
}
