import { CE_FILE_KIND } from '#common/shared/const-enum/CE_FILE_KIND';
import { type IFileMetadataDomainDto } from '#storage/dto/res/file/file.dto.type';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString } from 'class-validator';

export class FileMetadataDomainDto implements IFileMetadataDomainDto {
  @ApiProperty({
    description: '파일 종류',
    type: 'string',
    enum: CE_FILE_KIND,
  })
  @IsEnum(CE_FILE_KIND)
  kind!: CE_FILE_KIND;

  @ApiProperty({
    description: '파일 종류 id',
    type: 'string',
  })
  @IsNumberString()
  kindId!: string;

  @ApiProperty({
    description: '파일 명',
    type: 'string',
  })
  filename!: string;
}
