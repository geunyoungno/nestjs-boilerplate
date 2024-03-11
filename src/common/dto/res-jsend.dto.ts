import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

/**
 * @see https://seller-note.atlassian.net/wiki/spaces/TRADEDEV/pages/196938/REST+API+Response+Format
 */
export class JsendDto<TData = unknown> {
  @ApiProperty({
    description: `data`,
    nullable: true,
  })
  @IsString()
  @IsOptional()
  data?: TData;

  @ApiProperty({
    description: `error code`,
    type: 'string',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  code?: string;

  @ApiProperty({
    description: `error message`,
    type: 'string',
    nullable: true,
  })
  @IsString()
  @IsOptional()
  message?: string;

  constructor(args: { data?: TData; code?: string; message?: string }) {
    this.data = args?.data;
    this.code = args?.code;
    this.message = args?.message;
  }
}
