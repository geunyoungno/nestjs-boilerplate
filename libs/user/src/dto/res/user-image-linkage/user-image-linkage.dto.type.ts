import { type IImageAttributeBaseDto } from '#storage/dto/res/image/image.dto.type';
import { type IUserImageLinkageAttributeEntity } from '#user/entity/user-image-linkage.entity.type';

export interface IUserImageLinkageAttributeBaseDto
  extends Pick<
      IUserImageLinkageAttributeEntity,
      'uuid' | 'userUuid' | 'imageUuid' | 'kind' | 'priority' | 'isDefault' | 'createdAt' | 'updatedAt'
    >,
    Pick<IImageAttributeBaseDto, 'originalName' | 'extension' | 'originalUrl' | 'thumbnailUrl' | 'size'> {}

export interface IUserImageLinkageBaseDto extends IUserImageLinkageAttributeBaseDto {}
