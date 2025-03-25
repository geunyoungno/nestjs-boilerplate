import { isNotEmpty } from '#common/shared/tool/isEmpty';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty, type ApiPropertyOptions } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';
import { type Class, type Merge } from 'type-fest';

export const dtoDecorator = <IDto>(
  args: { dto: Class<IDto> | (() => Class<IDto>) } & Required<Pick<ApiPropertyOptions, 'description'>> &
    Partial<Merge<Pick<ApiPropertyOptions, 'required' | 'nullable'>, { required: boolean }>>,
) => {
  const dto: Class<IDto> = 'prototype' in args.dto ? (args.dto as Class<IDto>) : (args.dto as () => Class<IDto>)();
  const required = args.required ?? false; // 기본적으로 옵셔널로 사용되었다
  const nullable = args.nullable ?? false;

  return applyDecorators(
    ...[
      ApiProperty({
        description: args.description,
        nullable,
        required,
        type: () => dto,
      }),
      required === true && nullable === true ? undefined : IsOptional(),
      Type(() => dto),
      ValidateNested(),
    ].filter((decorator) => isNotEmpty(decorator)),
  );
};

export const dtoManyDecorator = <IDto>(
  args: { dto: () => Class<IDto> } & Required<Pick<ApiPropertyOptions, 'description'>> &
    Partial<Merge<Pick<ApiPropertyOptions, 'required' | 'nullable'>, { required: boolean }>>,
) => {
  const required = args.required ?? false; // 기본적으로 옵셔널로 사용되었다
  const nullable = args.nullable ?? false;

  return applyDecorators(
    ...[
      ApiProperty({
        description: args.description == null ? undefined : `${args.description} 목록`,
        isArray: true,
        required,
        type: args.dto(),
      }),
      IsArray(),
      required === true && nullable === true ? undefined : IsOptional(),
      Type(args.dto),
      ValidateNested({ each: true }),
    ].filter((decorator) => isNotEmpty(decorator)),
  );
};
