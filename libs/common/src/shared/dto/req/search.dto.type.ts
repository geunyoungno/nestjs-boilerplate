import {
  type CE_SEARCH_SORT_BY_FIELD,
  type CE_SEARCH_SORT_BY_ORDER,
} from '#common/shared/const-enum/CE_SEARCH_SORT_BY';

export interface ISearchPaginationBaseDto {
  /**
   * 보여줄 페이지
   * * 기본 값: 1
   */
  page: number;

  /**
   * 한 페이지당 보여줄 개수
   * * 기본 값: 10
   */
  limit: number;
}

export interface ISearchSortBaseDto {
  /**
   * 정렬 조건
   * * 기본 값: id:DESC
   */
  sortBy?: Array<`${CE_SEARCH_SORT_BY_FIELD}:${CE_SEARCH_SORT_BY_ORDER}`>;
}

export interface ISearchConditionBaseDto {
  /**
   * 필터 조건 - 생성일
   * * 기본 값 (선택 안함): 전체
   * * * $gte:{createdAt}: 생성일 이후 (포함)
   * * * $lte:{createdAt}: 생성일 이전 (포함)
   */
  ['filter.createdAt']?: Array<`${'$gte' | '$lte'}:${string}`>;

  /**
   * 필터 조건 - 수정일
   * * 기본 값 (선택 안함): 전체
   * * * $gte:{updatedAt}: 수정일 이후 (포함)
   * * * $lte:{updatedAt}: 수정일 이전 (포함)
   */
  ['filter.updatedAt']?: Array<`${'$gte' | '$lte'}:${string}`>;

  /** 검색어 */
  search?: string;
}

export interface ISearchBaseDto
  extends Partial<ISearchPaginationBaseDto>,
    ISearchSortBaseDto,
    ISearchConditionBaseDto {}
