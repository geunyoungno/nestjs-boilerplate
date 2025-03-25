import { CE_TABLE_INFO } from '#common/adaptor/database/const-enum/CE_TABLE_INFO';

/**
 * 사용자 연관 정보
 * * IMAGE_LINKAGES, image_linkages: 사용자 이미지 연계 목록
 * * TOKENS, tokens: 토큰 목록
 */
export const CE_USER_INCLUDE = {
  IMAGE_LINKAGES: 'image_linkages',
  TOKENS: 'tokens',
} as const;

export type CE_USER_INCLUDE = (typeof CE_USER_INCLUDE)[keyof typeof CE_USER_INCLUDE];

export const userIncludeDescriptions = [
  `사용자 연관 정보`,
  `${CE_USER_INCLUDE.IMAGE_LINKAGES}: ${CE_TABLE_INFO.USER_IMAGE_LINKAGE_SUMMARY} 목록`,
  `${CE_USER_INCLUDE.TOKENS}: ${CE_TABLE_INFO.TOKEN_SUMMARY} 목록`,
] as const;
