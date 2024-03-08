import { CE_TABLE_INFO } from '#common/const-enum/CE_TABLE_INFO';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';
import * as uuid from 'uuid';

@Expose()
export class ReadUserParamDto {
  @ApiProperty({
    description: `${CE_TABLE_INFO.USER_SUMMARY} 고유번호`,
    type: 'string',
    format: 'uuid',
    example: uuid.v4(),
  })
  @IsUUID(4)
  userUuid!: string;
}
