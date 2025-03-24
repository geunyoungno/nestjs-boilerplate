/**
 * 데이터베이스 키
 *
 * * NEST_DB, nest_db: 기본 데이터베이스
 */
export const CE_MYSQL_KEY = {
  NEST_DB: 'nest_db',
} as const;

export type CE_MYSQL_KEY = (typeof CE_MYSQL_KEY)[keyof typeof CE_MYSQL_KEY];
