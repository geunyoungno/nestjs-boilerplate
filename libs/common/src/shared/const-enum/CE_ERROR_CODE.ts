import { CE_TABLE_INFO } from '#common/adaptor/database/const-enum/CE_TABLE_INFO';

/**
 * 범용 오류 코드
 * * AT_LEAST_BAD_REQUEST, common-at-least-bad-request: 요청 온 필드가 최소한 갯수 미만인 경우
 * * BAD_REQUEST, common-bad-request: 요청 온 필드가 올바르지 않은 경우
 * * INTERNAL_SERVER_ERROR, common-internal-server-error: 서버 오류가 발생한 경우
 * * NOT_FOUND, common-not-found: 존재하지 않는 리소스를 조회하는 경우
 * * WEB_CLIENT_ERROR, common-web-client-error: 웹 클라이언트 오류가 발생한 경우
 */
const CE_COMMON_ERROR_CODE = {
  AT_LEAST_BAD_REQUEST: `${'common'}-at-least-bad-request`,
  BAD_REQUEST: `${'common'}-bad-request`,
  INTERNAL_SERVER_ERROR: `${'common'}-internal-server-error`,
  NOT_FOUND: `${'common'}-not-found`,
  WEB_CLIENT_ERROR: `${'common'}-web-client-error`,
} as const;

/**
 * 사용자 오류 코드
 * * ALREADY_EXIST, user-already-exist: 사용자가 이미 존재하는 경우
 * * BAD_REQUEST, user-bad-request: 사용자 요청이 잘못된 경우
 * * NOT_FOUND, user-not-found: 사용자를 찾을 수 없는 경우
 */
const CE_USER_ERROR_CODE = {
  ALREADY_EXIST: `${CE_TABLE_INFO.USER}-already-exist`,
  BAD_REQUEST: `${CE_TABLE_INFO.USER}-bad-request`,
  NOT_FOUND: `${CE_TABLE_INFO.USER}-not-found`,
} as const;

/**
 * 오류 코드
 */
export const CE_ERROR_CODE = {
  COMMON: CE_COMMON_ERROR_CODE,
  USER: CE_USER_ERROR_CODE,
} as const;

export type CE_ERROR_CODE = (typeof CE_ERROR_CODE)[keyof typeof CE_ERROR_CODE];
