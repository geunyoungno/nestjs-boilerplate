import { type ICommonDto } from '#common/shared/dto/common.dto.type';
import { type IImageAttributeEntity } from '#storage/entity/image.entity.type';

export interface IImageAttributeBaseDto
  extends Pick<
      IImageAttributeEntity,
      | 'uuid'
      | 'originalName'
      | 'extension'
      | 'storagePath'
      | 'thumbnailStoragePath'
      | 'width'
      | 'height'
      | 'size'
      | 'createdAt'
      | 'updatedAt'
    >,
    Pick<ICommonDto, 'originalUrl' | 'thumbnailUrl'> {}

export interface IImageBaseDto extends IImageAttributeBaseDto {}
