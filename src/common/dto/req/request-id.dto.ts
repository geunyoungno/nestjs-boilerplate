import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import * as uuid from 'uuid';

@Expose()
export class RequestIdHeaderDto {
  @ApiProperty({
    description: 'Request 고유 ID, uuid v4 사용',
    type: 'string',
    format: 'string',
    minLength: 36,
    maxLength: 64,
    example: `auto:${uuid.v4()}`,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(36)
  @MaxLength(64)
  ['x-request-id']!: string;
}
