/**
 * 공통 상수
 */
export const CE_COMMON = {
  DOMAIN: 'example.com',
} as const;

export type CE_COMMON = (typeof CE_COMMON)[keyof typeof CE_COMMON];
