import { CE_TABLE_INFO } from '#common/adaptor/database/const-enum/CE_TABLE_INFO';
import { type ICommonDto } from '#common/shared/dto/common.dto.type';
import { IsISO8601Datetime } from '#framework/decorator/dto/is-iso-8601-datetime.decorator';
import { uuidDecorator } from '#framework/decorator/dto/uuid.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsUrl, Min } from 'class-validator';

export class CommonDto implements ICommonDto {
  // SECTION - uuid
  @uuidDecorator({ description: '고유', required: true })
  uuid!: string;

  @uuidDecorator({ description: CE_TABLE_INFO.USER_SUMMARY, required: true })
  userUuid!: string;

  @uuidDecorator({ description: CE_TABLE_INFO.IMAGE_SUMMARY, required: true })
  imageUuid!: string;
  // !SECTION

  // SECTION - date-item
  @ApiProperty({
    description: '생성 시점',
    format: 'date-time',
    type: 'string',
  })
  @IsISO8601Datetime()
  createdAt!: Date;

  @ApiProperty({
    description: '최근 수정 시점',
    format: 'date-time',
    type: 'string',
  })
  @IsISO8601Datetime()
  updatedAt!: Date;
  // !SECTION

  // SECTION - 파일, 이미지
  @ApiProperty({
    description: '원본 이미지 url',
    format: 'url',
    type: 'string',
  })
  @IsUrl()
  originalUrl!: string;

  @ApiProperty({
    description: '썸네일 이미지 url',
    format: 'url',
    type: 'string',
  })
  @IsUrl()
  thumbnailUrl!: string;
  // !SECTION

  @ApiProperty({
    description: ['우선 순위', '* 숫자가 클수록 우선순위가 높음'].join('\n'),
    minimum: 0,
    type: 'integer',
  })
  @IsInt()
  @Min(0)
  priority!: number;

  @ApiProperty({
    default: false,
    description: '기본 여부',
    type: 'boolean',
  })
  @IsBoolean()
  isDefault!: boolean;
}
