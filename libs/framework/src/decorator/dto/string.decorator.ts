import { isNotEmpty } from '#common/shared/tool/isEmpty';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty, type ApiPropertyOptions } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsOptional, IsString, MaxLength } from 'class-validator';
import { type Merge } from 'type-fest';

export const stringDecorator = (
  args: Merge<Required<Pick<ApiPropertyOptions, 'description' | 'required'>>, { required: boolean }> &
    Pick<ApiPropertyOptions, 'maxLength'>,
) => {
  const required = args.required ?? false;
  const maxLength = args.maxLength ?? undefined;

  return applyDecorators(
    ...[
      ApiProperty({
        description: args.description ?? undefined,
        type: 'string',
        required,
        maxLength,
      }),
      // transform
      // Transform(({ value }) => String(value)),
      // validator
      IsString(),
      required === true ? undefined : IsOptional(),
      isNotEmpty(maxLength) ? MaxLength(maxLength) : undefined,
    ].filter((decorator) => isNotEmpty(decorator)),
  );
};

export const stringManyDecorator = (
  args: Merge<Required<Pick<ApiPropertyOptions, 'description' | 'required'>>, { required: boolean }>,
) => {
  const required = args.required ?? false;

  return applyDecorators(
    ...[
      ApiProperty({
        description: args.description ?? undefined,
        isArray: true,
        items: { type: 'string' },
        required,
      }),
      // transform
      Transform(({ value }) => (Array.isArray(value) ? value : Array(value))),
      // validator
      IsArray(),
      IsString({ each: true }),
      required === true ? undefined : IsOptional(),
    ].filter((decorator) => isNotEmpty(decorator)),
  );
};
