import { CE_DB_LOGGER_LEVEL } from '#common/adaptor/database/const-enum/CE_DB_LOGGER_LEVEL';
import { escape } from '#common/shared/tool/escape';
import escapeStringify from '#common/shared/tool/escapeStringify';
import { type LoggerService } from '#framework/logger/logger.service';
import { HttpStatus } from '@nestjs/common';
import dayjs from 'dayjs';
import fastSafeStringify from 'fast-safe-stringify';
import type { Logger, QueryRunner } from 'typeorm';
import * as uuid from 'uuid';

export default class TypeormLogger implements Logger {
  private readonly excludeQueries = ['SELECT VERSION() AS `version'];

  constructor(private readonly loggerService: LoggerService) {}

  public static getLogLevel(level?: string): CE_DB_LOGGER_LEVEL {
    if (level === CE_DB_LOGGER_LEVEL.INFO || level === CE_DB_LOGGER_LEVEL.LOG || level === CE_DB_LOGGER_LEVEL.WARN) {
      return level;
    }

    return CE_DB_LOGGER_LEVEL.LOG;
  }

  accessor level: CE_DB_LOGGER_LEVEL = TypeormLogger.getLogLevel(process.env.ENV_DB_LOG_LEVEL);

  getParameter(parameter: unknown): string {
    try {
      if (parameter == null) {
        return '';
      }

      if (typeof parameter === 'string') {
        return `'${parameter}'`;
      }

      if (parameter instanceof Date) {
        return `'${dayjs(parameter).toISOString()}'`;
      }

      if (typeof parameter === 'object' && 'toSqlString' in parameter && typeof parameter.toSqlString === 'function') {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        return parameter.toSqlString() as string;
      }

      if (typeof parameter === 'boolean') {
        return `${parameter ? 'true' : 'false'}`;
      }

      if (typeof parameter === 'number') {
        return `${parameter}`;
      }

      return `'${JSON.stringify(parameter)}'`;
    } catch {
      return '';
    }
  }

  evaluate(query: string, parameters: undefined | Array<string | string[]>): string {
    // eslint-disable-next-line no-restricted-syntax
    let next = query;

    if (parameters == null || parameters.length <= 0) {
      return next;
    }

    parameters.forEach((parameter) => {
      if (typeof parameter === 'object') {
        if (Array.isArray(parameter)) {
          parameter.forEach((element) => {
            next = next.replace('?', element);
          });
        } else {
          next = next.replace('?', parameter);
        }
      } else {
        next = next.replace('?', parameter);
      }
    });

    return next;
  }

  getQueryAndParameters(query: string, parameters?: unknown[]) {
    const evaluatedParameters = parameters?.map((parameter) => {
      if (typeof parameter === 'object') {
        if (Array.isArray(parameter)) {
          return parameter.map((element) => this.getParameter(element));
        }

        return this.getParameter(parameter);
      }

      return this.getParameter(parameter);
    });

    const rawQuery = escapeStringify(this.evaluate(query, evaluatedParameters));

    return { parameters: evaluatedParameters, query: rawQuery };
  }

  // in logger you can access it this way:
  logQuery(query: string, parameters?: unknown[], _queryRunner?: QueryRunner) {
    if (this.level !== CE_DB_LOGGER_LEVEL.LOG) {
      return undefined;
    }

    if (this.excludeQueries.some((excludeQuery) => query.includes(excludeQuery))) {
      return undefined;
    }

    const matchKey = `${uuid.v4()}${uuid.v4()}`.replace(/-/g, '');

    const queryAndParameters = this.getQueryAndParameters(query, parameters);

    // 로그가 너무 많이 적재되어 non-evaluate는 일단 주석 처리
    // this.loggerService.typeormInfo({
    //   req_url: `typeorm://query/non-evaluate`,
    //   payload: {
    //     query: escape(query),
    //     match_key: matchKey,
    //     parameters: escapeStringify(queryAndParameters.parameters),
    //   },
    // });

    this.loggerService.typeormInfo({
      req_url: `typeorm://query`,
      payload: {
        raw_query: queryAndParameters.query,
        match_key: matchKey,
        parameters: escapeStringify(queryAndParameters.parameters),
      },
    });
  }

  /**
   * Logs query that is failed.
   */
  logQueryError(error: string | Error, query: string, parameters?: unknown[], _queryRunner?: QueryRunner) {
    if (this.level === 'warn') {
      return undefined;
    }

    if (this.excludeQueries.some((excludeQuery) => query.includes(excludeQuery))) {
      return undefined;
    }

    const queryAndParameters = this.getQueryAndParameters(query, parameters);

    this.loggerService.typeormError({
      req_url: `typeorm://query/error`,
      err: {
        message: typeof error === 'string' ? error : error.message,
        stack: error instanceof Error ? (error.stack ?? '') : undefined,
      },
      payload: {
        query: escape(query),
        parameters: escapeStringify(queryAndParameters.parameters),
        raw_query: queryAndParameters.query,
      },
    });
  }

  /**
   * Logs query that is slow.
   */
  logQuerySlow(time: number, query: string, parameters?: unknown[], _queryRunner?: QueryRunner) {
    const queryAndParameters = this.getQueryAndParameters(query, parameters);

    this.loggerService.typeormInfo({
      req_url: `typeorm://query/slow`,
      duration: time,
      payload: {
        query: escape(query),
        parameters: escapeStringify(queryAndParameters.parameters),
        raw_query: queryAndParameters.query,
      },
    });

    // NOTE: 추후 slack 등으로 알림을 보낼 수 있도록 개선
  }

  /**
   * Logs events from the schema build process.
   */
  logSchemaBuild(message: string, _queryRunner?: QueryRunner) {
    this.loggerService.trace(message);
  }

  /**
   * Logs events from the migrations run process.
   */
  logMigration(message: string, _queryRunner?: QueryRunner) {
    this.loggerService.trace(message);
  }

  /**
   * Perform logging using given logger, or by default to the console.
   * Log has its own level and message.
   */
  log(level: 'log' | 'info' | 'warn', message: unknown) {
    this.level = level;

    this.loggerService.info({
      discriminator: 'typeorm_error',
      status: HttpStatus.OK,
      req_method: 'INFO',
      req_url: `typeorm://query/error`,
      payload: {
        next_level: level,
        message: fastSafeStringify(message),
      },
    });
  }
}
