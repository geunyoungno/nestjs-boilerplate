import { uuidExample } from '#framework/decorator/dto/uuid.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

@Expose()
export class RequestIdHeaderBaseDto {
  @ApiProperty({
    description: 'Request 고유 ID, uuid v4 사용',
    example: `auto:${uuidExample}`,
    format: 'string',
    maxLength: 64,
    minLength: 36,
    type: 'string',
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(64)
  @MinLength(36)
  ['x-request-id']!: string;
}
