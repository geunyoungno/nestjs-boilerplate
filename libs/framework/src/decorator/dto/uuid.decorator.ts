import { isNotEmpty } from '#common/shared/tool/isEmpty';
import { applyDecorators } from '@nestjs/common';
import { ApiProperty, type ApiPropertyOptions } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, ArrayUnique, IsArray, IsOptional, IsUUID } from 'class-validator';
import { type Merge } from 'type-fest';

export const uuidExample = '00000000-0000-0000-0000-000000000000' as const;
const MAX_ITEMS = 100 as const;
const MIN_ITEMS = 1 as const;

export const uuidDecorator = (
  args: Merge<Required<Pick<ApiPropertyOptions, 'description' | 'required'>>, { required: boolean }>,
) => {
  const required = args.required;

  return applyDecorators(
    ...[
      ApiProperty({
        description: [args.description, `uuid`].join(' '),
        example: uuidExample,
        format: 'uuid',
        required,
        type: 'string',
      }),
      IsUUID(4),
      required === true ? undefined : IsOptional(),
    ].filter((decorator) => isNotEmpty(decorator)),
  );
};

export const uuidManyDecorator = (
  args: Merge<Required<Pick<ApiPropertyOptions, 'description' | 'required'>>, { required: boolean }> &
    Partial<Pick<ApiPropertyOptions, 'maxItems' | 'minItems'>>,
) => {
  const required = args.required;
  const maxItems = args.maxItems ?? MAX_ITEMS;
  const minItems = args.minItems ?? MIN_ITEMS;

  return applyDecorators(
    ...[
      ApiProperty({
        description: [args.description, `uuid 목록`].join(' '),
        isArray: true,
        items: { type: 'string', format: 'uuid', example: uuidExample },
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
      IsUUID(4, { each: true }),
      required === true ? undefined : IsOptional(),
    ].filter((decorator) => isNotEmpty(decorator)),
  );
};

/**
 * body에서 사용하는 uuid 목록 데코레이터
 */
export const uuidManyBodyDecorator = (
  args: Merge<Required<Pick<ApiPropertyOptions, 'description' | 'required'>>, { required: boolean }> &
    Partial<Pick<ApiPropertyOptions, 'maxItems' | 'minItems'>>,
) => {
  const required = args.required;
  const maxItems = args.maxItems ?? MAX_ITEMS;
  const minItems = args.minItems ?? MIN_ITEMS;

  return applyDecorators(
    ...[
      ApiProperty({
        description: [args.description, `uuid 목록`].join(' '),
        example: [uuidExample],
        format: 'uuid',
        isArray: true,
        maxItems,
        minItems,
        required,
        type: 'string',
        uniqueItems: true,
      }),
      // transform
      Transform(({ value }) => (Array.isArray(value) ? value : Array(value))),
      // validator
      ArrayMaxSize(maxItems),
      ArrayMinSize(minItems),
      IsArray(),
      IsUUID(4, { each: true }),
      required === true ? undefined : IsOptional(),
    ].filter((decorator) => isNotEmpty(decorator)),
  );
};
