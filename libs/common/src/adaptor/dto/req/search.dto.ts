import {
  ISearchBaseDto,
  ISearchConditionBaseDto,
  ISearchPaginationBaseDto,
  ISearchSortBaseDto,
} from '#common/adaptor/dto/req/search.dto.type';
import { enumManyDecorator } from '#framework/decorator/dto/enum.decorator';
import { stringManyDecorator } from '#framework/decorator/dto/string.decorator';
import { ApiProperty, IntersectionType, PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Min } from 'class-validator';

export const sortByArray = [
  'id:ASC',
  'id:DESC',
  'createdAt:ASC',
  'createdAt:DESC',
  'updatedAt:ASC',
  'updatedAt:DESC',
] as const satisfies NonNullable<ISearchSortBaseDto['sortBy']>;

export class SearchPaginationBaseDto implements ISearchPaginationBaseDto {
  @ApiProperty({
    default: 1,
    description: '보여줄 페이지',
    minimum: 1,
    type: 'integer',
  })
  @IsInt()
  @Min(1)
  page!: number;

  @ApiProperty({
    default: 10,
    description: '한 페이지당 보여줄 개수',
    minimum: 1,
    type: 'integer',
  })
  @IsInt()
  @Min(1)
  limit!: number;
}

export class SearchSortBaseDto implements ISearchSortBaseDto {
  @enumManyDecorator({
    description: ['정렬 조건', '* 기본 값 (선택 안함): id:DESC'].join('\n'),
    enum: sortByArray,
    required: false,
  })
  sortBy?: ISearchSortBaseDto['sortBy'];
}

export class SearchConditionBaseDto implements ISearchConditionBaseDto {
  @stringManyDecorator({
    description: [
      '필터 조건 - 생성일',
      '* 기본 값 (선택 안함): 전체',
      '* $gte:{createdAt}: 생성일 이후 (포함)',
      '* $lte:{createdAt}: 생성일 이전 (포함)',
    ].join('\n'),
    required: false,
  })
  ['filter.createdAt']?: Array<`${'$gte' | '$lte'}:${string}`>;

  @stringManyDecorator({
    description: [
      '필터 조건 - 수정일',
      '* 기본 값 (선택 안함): 전체',
      '* $gte:{updatedAt}: 수정일 이후 (포함)',
      '* $lte:{updatedAt}: 수정일 이전 (포함)',
    ].join('\n'),
    required: false,
  })
  ['filter.updatedAt']?: Array<`${'$gte' | '$lte'}:${string}`>;

  @ApiProperty({
    description: ['검색어'].join('\n'),
    required: false,
    type: 'string',
  })
  @IsOptional()
  @IsString()
  search?: string;
}

export class SearchBaseDto
  extends IntersectionType(PartialType(SearchPaginationBaseDto), SearchSortBaseDto, SearchConditionBaseDto)
  implements ISearchBaseDto {}
