import { type ICommonDto } from '#common/shared/dto/common.dto.type';
import { IsISO8601Datetime } from '#framework/decorator/dto/is-iso-8601-datetime.decorator';
import { uuidDecorator } from '#framework/decorator/dto/uuid.decorator';
import { ApiProperty } from '@nestjs/swagger';

export class CommonDto implements ICommonDto {
  // SECTION - uuid
  @uuidDecorator({ description: '고유', required: true })
  uuid!: string;
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
}
