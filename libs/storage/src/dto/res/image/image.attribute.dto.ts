import { CommonDto } from '#common/shared/dto/common.dto';
import { type IImageAttributeBaseDto } from '#storage/dto/res/image/image.dto.type';
import { IImageAttributeEntity } from '#storage/entity/image.entity.type';
import { getStoragePrefix } from '#storage/tool/getStoragePrefix';
import { storagePathToUrl } from '#storage/tool/storagePathToUrl';
import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export class ImageAttributeBaseDto
  extends PickType(CommonDto, ['uuid', 'createdAt', 'updatedAt', 'originalUrl', 'thumbnailUrl'] as const)
  implements IImageAttributeBaseDto
{
  @ApiProperty({
    description: '이미지 원본 이름',
    type: 'string',
  })
  @IsString()
  originalName: string;

  @ApiProperty({
    description: '확장자',
    type: 'string',
  })
  @IsString()
  extension: string;

  @ApiProperty({
    description: '저장 경로',
    type: 'string',
  })
  @IsString()
  storagePath: string;

  @ApiProperty({
    description: '썸내일 저장 경로',
    nullable: true,
    type: 'string',
  })
  @IsString()
  @IsOptional()
  thumbnailStoragePath: string | null;

  @ApiProperty({
    description: '해상도 가로',
    minimum: 0,
    nullable: true,
    type: 'integer',
  })
  @IsInt()
  @IsOptional()
  @Min(0)
  width: number | null;

  @ApiProperty({
    description: '해상도 세로',
    minimum: 0,
    nullable: true,
    type: 'integer',
  })
  @IsInt()
  @IsOptional()
  @Min(0)
  height: number | null;

  @ApiProperty({
    description: '파일 크기',
    minimum: 0,
    type: 'integer',
  })
  @IsInt()
  @Min(0)
  size: number;

  constructor(args: IImageAttributeEntity) {
    super(args);

    this.uuid = args.uuid;

    this.originalName = args.originalName;
    this.extension = args.extension;
    this.storagePath = args.storagePath;
    this.thumbnailStoragePath = args.thumbnailStoragePath;
    this.width = args.width;
    this.height = args.height;
    this.size = args.size;

    this.originalUrl = storagePathToUrl({ storagePath: args.storagePath });
    // NOTE: 썸내일 저장 경로가 없으면 원본 이미지 경로에서 썸내일 경로를 생성
    const thumbnailStoragePath = args.thumbnailStoragePath ?? getStoragePrefix({ imageUuid: args.uuid }).thumbnailPath;
    this.thumbnailUrl = storagePathToUrl({ storagePath: thumbnailStoragePath });

    this.createdAt = args.createdAt;
    this.updatedAt = args.updatedAt;
  }
}
