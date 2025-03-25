import { initDto } from '#common/shared/tool/initDto';
import { ImageAttributeBaseDto } from '#storage/dto/res/image/image.attribute.dto';
import { type IImageBaseDto } from '#storage/dto/res/image/image.dto.type';
import { type IImageEntity } from '#storage/entity/image.entity.type';
import { IntersectionType } from '@nestjs/swagger';

export class ImageBaseDto extends IntersectionType(ImageAttributeBaseDto) implements IImageBaseDto {
  constructor(args: IImageEntity) {
    super(args);

    initDto<ImageBaseDto, IImageEntity>({ thisDto: this, parentDtos: [ImageAttributeBaseDto], entity: args });
  }
}
