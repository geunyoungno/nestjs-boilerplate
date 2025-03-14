import { isNotEmpty } from '#common/shared/tool/isEmpty';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty, type ApiPropertyOptions } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, ArrayUnique, IsArray, IsEnum, IsOptional } from 'class-validator';
import { type Merge } from 'type-fest';

export const enumDecorator = (
  args: Merge<Required<Pick<ApiPropertyOptions, 'description' | 'required'>>, { required: boolean }> & {
    enum: NonNullable<Exclude<ApiPropertyOptions['enum'], () => void>>;
  },
) => {
  const required = args.required ?? false;
  const argsEnum = Array.isArray(args.enum) ? args.enum : Object.values(args.enum);

  return applyDecorators(
    ...[
      ApiProperty({
        description: args.description ?? undefined,
        enum: argsEnum,
        type: 'string',
        required,
      }),
      IsEnum(argsEnum),
      required === true ? undefined : IsOptional(),
    ].filter((decorator) => isNotEmpty(decorator)),
  );
};

export const enumManyDecorator = (
  args: Merge<Required<Pick<ApiPropertyOptions, 'description' | 'required'>>, { required: boolean }> &
    Partial<Pick<ApiPropertyOptions, 'minItems'>> & {
      enum: NonNullable<Exclude<ApiPropertyOptions['enum'], () => void>>;
    },
) => {
  const required = args.required ?? false;
  const argsEnum = Array.isArray(args.enum) ? args.enum : Object.values(args.enum);

  const maxItems: number = argsEnum.length;
  const minItems: number = args?.minItems ?? 1;

  return applyDecorators(
    ...[
      ApiProperty({
        description: args.description ?? undefined,
        enum: argsEnum,
        isArray: true,
        maxItems,
        minItems,
        required,
        uniqueItems: true,
      }),
      // transform
      Transform(({ value }) => (Array.isArray(value) ? value : Array(value))),
      // validator
      ArrayMaxSize(maxItems),
      ArrayMinSize(minItems),
      ArrayUnique(),
      IsArray(),
      IsEnum(argsEnum, { each: true }),
      required === true ? undefined : IsOptional(),
    ].filter((decorator) => isNotEmpty(decorator)),
  );
};
