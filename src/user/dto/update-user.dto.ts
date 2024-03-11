import { CE_TABLE_INFO } from '#common/const-enum/CE_TABLE_INFO';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, IsString, IsUUID } from 'class-validator';
import * as uuid from 'uuid';

@Expose()
export class UpdateUserParamDto {
  @ApiProperty({
    description: `${CE_TABLE_INFO.USER_SUMMARY} 고유번호`,
    type: 'string',
    format: 'uuid',
    example: uuid.v4(),
  })
  @IsUUID(4)
  userUuid!: string;
}

@Expose()
export class UpdateUserBodyDto {
  @ApiProperty({
    description: `${CE_TABLE_INFO.USER_SUMMARY} 성명`,
    type: 'string',
    required: false,
    default: `${CE_TABLE_INFO.USER_SUMMARY} 성명`,
  })
  @IsString()
  @IsOptional()
  fullName?: string;
}
