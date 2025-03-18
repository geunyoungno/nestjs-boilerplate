/**
 * 사용자 검색 조건
 * * EMAIL, email: 이메일
 * * FULL_NAME, full_name: 이름
 */
export const CE_USER_SEARCH_BY = {
  EMAIL: 'email',
  FULL_NAME: 'fullName',
} as const;

export type CE_USER_SEARCH_BY = (typeof CE_USER_SEARCH_BY)[keyof typeof CE_USER_SEARCH_BY];

export const userSearchByDescriptions = [
  '사용자 검색 조건',
  `* ${CE_USER_SEARCH_BY.EMAIL}: 이메일`,
  `* ${CE_USER_SEARCH_BY.FULL_NAME}: 이름`,
] as const;
