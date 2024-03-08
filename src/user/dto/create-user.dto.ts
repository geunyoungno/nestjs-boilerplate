import { CE_TABLE_INFO } from '#common/const-enum/CE_TABLE_INFO';
import { IsISO8601Datetime } from '#common/decorator/is-iso-8601-datetime.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

@Expose()
export class CreateUserBodyDto {
  @ApiProperty({
    description: `${CE_TABLE_INFO.USER_SUMMARY} 성명`,
    type: 'string',
    default: `${CE_TABLE_INFO.USER_SUMMARY} 성명`,
  })
  @IsString()
  fullName!: string;

  @ApiProperty({
    description: `${CE_TABLE_INFO.USER_SUMMARY} 생성시점`,
    format: 'date-time',
    default: new Date(),
  })
  @IsISO8601Datetime()
  @IsOptional()
  createdAt?: Date;
}
