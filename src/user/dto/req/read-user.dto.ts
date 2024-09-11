import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsUUID } from 'class-validator';
import * as uuid from 'uuid';

@Expose()
export class ReadUserParamDto {
  @ApiProperty({
    description: `사용자 고유번호`,
    type: 'string',
    format: 'uuid',
    example: uuid.v4(),
  })
  @IsUUID(4)
  userUuid!: string;
}
