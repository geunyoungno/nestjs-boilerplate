import { CommonDto } from '#common/shared/dto/common.dto';
import { enumDecorator } from '#framework/decorator/dto/enum.decorator';
import { ImageAttributeBaseDto } from '#storage/dto/res/image/image.attribute.dto';
import { getStoragePrefix } from '#storage/tool/getStoragePrefix';
import { storagePathToUrl } from '#storage/tool/storagePathToUrl';
import { CE_USER_IMAGE_KIND, userImageKindDescriptions } from '#user/const-enum/CE_USER_IMAGE_KIND';
import { IUserImageLinkageAttributeBaseDto } from '#user/dto/res/user-image-linkage/user-image-linkage.dto.type';
import {
  IUserImageLinkageAttributeEntity,
  IUserImageLinkageRelationEntity,
} from '#user/entity/user-image-linkage.entity.type';
import { IntersectionType, PickType } from '@nestjs/swagger';

export class UserImageLinkageAttributeBaseDto
  extends IntersectionType(
    PickType(CommonDto, [
      'uuid',
      'userUuid',
      'imageUuid',
      'originalUrl',
      'priority',
      'isDefault',
      'createdAt',
      'updatedAt',
    ] as const),
    PickType(ImageAttributeBaseDto, ['originalName', 'extension', 'originalUrl', 'thumbnailUrl', 'size'] as const),
  )
  implements IUserImageLinkageAttributeBaseDto
{
  @enumDecorator({
    description: userImageKindDescriptions.join('\n'),
    enum: CE_USER_IMAGE_KIND,
    required: true,
  })
  kind: CE_USER_IMAGE_KIND;

  constructor(args: IUserImageLinkageAttributeEntity & Pick<IUserImageLinkageRelationEntity, 'image'>) {
    super(args);

    this.uuid = args.uuid;

    this.userUuid = args.userUuid;
    this.imageUuid = args.imageUuid;
    this.kind = args.kind;
    this.priority = args.priority;
    this.isDefault = args.isDefault;

    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;

    this.originalName = args.image?.originalName ?? '';
    this.extension = args.image?.extension ?? '';
    this.originalUrl = storagePathToUrl({ storagePath: args.image?.storagePath });
    // NOTE: 썸내일 저장 경로가 없으면 원본 이미지 경로에서 썸내일 경로를 생성
    const thumbnailStoragePath =
      args.image?.thumbnailStoragePath ?? getStoragePrefix({ imageUuid: args.imageUuid }).thumbnailPath;
    this.thumbnailUrl = storagePathToUrl({ storagePath: thumbnailStoragePath });
    this.size = args.image?.size ?? 0;
  }
}
