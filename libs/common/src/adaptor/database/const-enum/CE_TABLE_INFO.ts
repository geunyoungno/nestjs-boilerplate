const CE_AUTH_TABLE_INFO = {
  // 토큰
  TOKEN: 'token',
  TOKEN_SUMMARY: '토큰',
  TOKEN_ALIAS: 'tk_as',
} as const;

const CE_USER_TABLE_INFO = {
  // 사용자
  USER: 'user',
  USER_SUMMARY: '사용자',
  USER_ALIAS: 'us_as',
} as const;

export const CE_TABLE_INFO = {
  ...CE_AUTH_TABLE_INFO,
  ...CE_USER_TABLE_INFO,
} as const;

export type CE_TABLE_INFO = (typeof CE_TABLE_INFO)[keyof typeof CE_TABLE_INFO];

// NOTE: relation을 위해서 복수형을 정의함
export const CE_TABLE_PLURAL = {
  [CE_AUTH_TABLE_INFO.TOKEN]: 'tokens',
  [CE_USER_TABLE_INFO.USER]: 'users',
} as const;

export type CE_TABLE_PLURAL = (typeof CE_TABLE_PLURAL)[keyof typeof CE_TABLE_PLURAL];
