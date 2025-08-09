import { type TClass, type TMerge } from '#common/shared/dto/utility.type';
import { isNotEmpty } from '#common/shared/tool/isEmpty';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty, type ApiPropertyOptions } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, ValidateNested } from 'class-validator';

export const dtoDecorator = <IDto>(
  args: { dto: TClass<IDto> | (() => TClass<IDto>) } & Required<Pick<ApiPropertyOptions, 'description'>> &
    Partial<TMerge<Pick<ApiPropertyOptions, 'required' | 'nullable'>, { required: boolean }>>,
) => {
  const dto: TClass<IDto> = 'prototype' in args.dto ? (args.dto as TClass<IDto>) : (args.dto as () => TClass<IDto>)();
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
  args: { dto: () => TClass<IDto> } & Required<Pick<ApiPropertyOptions, 'description'>> &
    Partial<TMerge<Pick<ApiPropertyOptions, 'required' | 'nullable'>, { required: boolean }>>,
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
