import { type TFirstArrayElement } from '#common/shared/dto/utility.type';
import type { Logger } from 'typeorm';

/**
 * 로그레벨
 *
 * - log : 모든 쿼리 기록
 * - info: 쿼리 오류, 슬로우 쿼리만 기록
 * - warn: 슬로우 쿼리만 기록
 */
type TTypeormLoggerLevel = TFirstArrayElement<Parameters<Logger['log']>>;

/**
 * 로그레벨
 *
 * * LOG, log: 모든 쿼리 기록
 * * INFO, info: 쿼리 오류, 슬로우 쿼리만 기록
 * * WARN, warn: 슬로우 쿼리만 기록
 */
export const CE_DB_LOGGER_LEVEL = {
  LOG: 'log',
  INFO: 'info',
  WARN: 'warn',
} as const satisfies Record<Uppercase<TTypeormLoggerLevel>, TTypeormLoggerLevel>;

export type CE_DB_LOGGER_LEVEL = (typeof CE_DB_LOGGER_LEVEL)[keyof typeof CE_DB_LOGGER_LEVEL];
