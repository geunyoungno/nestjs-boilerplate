/**
 * 레디스 키
 *
 * * NEST_REDIS, nest_redis: 기본 레디스
 */
export const CE_REDIS_KEY = {
  NEST_REDIS: 'nest_redis',
} as const;

export type CE_REDIS_KEY = (typeof CE_REDIS_KEY)[keyof typeof CE_REDIS_KEY];
