/**
 * 토큰 상태
 * * BAN, ban: 금지됨
 * * EXPIRY, expiry: 만료됨
 * * ISSUE, issue: 발행됨
 * * REFRESH, refresh: 갱신됨
 * * SIGN_OUT, sign_out: 사인아웃됨
 */
export const CE_TOKEN_STATUS = {
  BAN: 'ban',
  EXPIRY: 'expiry',
  ISSUE: 'issue',
  REFRESH: 'refresh',
  SIGN_OUT: 'sign_out',
} as const;

export type CE_TOKEN_STATUS = (typeof CE_TOKEN_STATUS)[keyof typeof CE_TOKEN_STATUS];

export const tokenStatusDescriptions = [
  '토큰 상태',
  `* ${CE_TOKEN_STATUS.BAN}: 금지됨`,
  `* ${CE_TOKEN_STATUS.EXPIRY}: 만료됨`,
  `* ${CE_TOKEN_STATUS.ISSUE}: 발행됨`,
  `* ${CE_TOKEN_STATUS.REFRESH}: 갱신됨`,
  `* ${CE_TOKEN_STATUS.SIGN_OUT}: 사인아웃됨`,
] as const;
