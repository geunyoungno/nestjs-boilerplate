/**
 * 토큰 만료 시간
 * 초 단위
 * * ACCESS: access token 만료 시간
 * * REFRESH: refresh token 만료 시간
 */
export const CE_TOKEN_EXPIRES_IN = {
  /** access token 만료 시간: 1시간, 초 단위*/
  ACCESS: 60 * 60,

  /** refresh token 만료 시간: 14일, 초 단위 */
  REFRESH: 14 * 24 * 60 * 60,
} as const;

export type CE_TOKEN_EXPIRES_IN = (typeof CE_TOKEN_EXPIRES_IN)[keyof typeof CE_TOKEN_EXPIRES_IN];
