import { CE_ERROR_CODE } from '#common/shared/const-enum/CE_ERROR_CODE';
import { IFailureJsendDto, ISuccessJsendDto } from '#common/shared/dto/res/jsend.dto.type';
import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { type LiteralUnion } from 'type-fest';

export class SuccessJsendDto<TData = unknown> implements ISuccessJsendDto<TData> {
  @ApiProperty({
    description: `http status code`,
    enum: HttpStatus,
    required: true,
    type: 'number',
  })
  @IsEnum(HttpStatus)
  statusCode: number;

  @ApiProperty({
    description: `data`,
    required: false,
  })
  @IsOptional()
  data?: TData;

  constructor(args: ISuccessJsendDto<TData>) {
    this.statusCode = args.statusCode;
    this.data = args?.data;
  }
}

class FailureErrorJsendDto<TData = unknown> implements Readonly<IFailureJsendDto<TData>['error']> {
  @ApiProperty({
    description: `error code`,
    type: 'string',
    required: true,
  })
  @IsString()
  code: LiteralUnion<CE_ERROR_CODE, string>;

  @ApiProperty({
    description: `error detail`,
    required: false,
  })
  @IsOptional()
  errors?: TData;

  @ApiProperty({
    description: `error message`,
    type: 'string',
    required: false,
  })
  @IsString()
  @IsOptional()
  message?: string;

  constructor(args: IFailureJsendDto<TData>['error']) {
    this.code = args.code;
    this.errors = args.errors;
    this.message = args.message;
  }
}

export class FailureJsendDto<TData = unknown> implements IFailureJsendDto<TData> {
  @ApiProperty({
    description: `http status code`,
    enum: HttpStatus,
    required: true,
    type: 'number',
  })
  @IsEnum(HttpStatus)
  statusCode: number;

  @ApiProperty({
    description: `error 정보`,
    required: true,
    type: FailureErrorJsendDto<TData>,
  })
  @ValidateNested()
  @Type(() => FailureErrorJsendDto<TData>)
  error: FailureErrorJsendDto<TData>;

  constructor(args: IFailureJsendDto<TData>) {
    this.statusCode = args.statusCode;
    this.error = new FailureErrorJsendDto(args.error);
  }
}
