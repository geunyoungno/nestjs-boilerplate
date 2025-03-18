/**
 * 검색 비교 조건
 * * $GTE, $gte: 이상
 * * $LTE, $lte: 이하
 */
export const CE_SEARCH_COMPARISON = {
  $GTE: '$gte',
  $LTE: '$lte',
} as const;

export type CE_SEARCH_COMPARISON = (typeof CE_SEARCH_COMPARISON)[keyof typeof CE_SEARCH_COMPARISON];
