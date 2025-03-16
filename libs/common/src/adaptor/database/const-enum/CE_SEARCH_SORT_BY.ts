/**
 * 정렬 필드
 * * ID, id: id
 * * CREATED_AT, createdAt: 생성일
 * * UPDATED_AT, updatedAt: 수정일
 */
export const CE_SEARCH_SORT_BY_FIELD = {
  ID: 'id',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
} as const;

export type CE_SEARCH_SORT_BY_FIELD = (typeof CE_SEARCH_SORT_BY_FIELD)[keyof typeof CE_SEARCH_SORT_BY_FIELD];

/**
 * 정렬 순서
 * * ASC, asc: 오름차순
 * * DESC, desc: 내림차순
 */
export const CE_SEARCH_SORT_BY_ORDER = {
  ASC: 'ASC',
  DESC: 'DESC',
} as const;

export type CE_SEARCH_SORT_BY_ORDER = (typeof CE_SEARCH_SORT_BY_ORDER)[keyof typeof CE_SEARCH_SORT_BY_ORDER];
