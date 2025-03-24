import { CE_TABLE_INFO } from '#common/adaptor/database/const-enum/CE_TABLE_INFO';

/**
 * 사용자 연관 정보
 * * TOKENS, tokens: 토큰 목록
 */
export const CE_USER_INCLUDE = {
  TOKENS: 'tokens',
} as const;

export type CE_USER_INCLUDE = (typeof CE_USER_INCLUDE)[keyof typeof CE_USER_INCLUDE];

export const userIncludeDescriptions = [
  `사용자 연관 정보`,
  `${CE_USER_INCLUDE.TOKENS}: ${CE_TABLE_INFO.TOKEN_SUMMARY} 목록`,
] as const;
