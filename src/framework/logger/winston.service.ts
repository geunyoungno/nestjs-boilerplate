import { CE_LOG_COLOR, CE_LOG_LEVEL, type CE_LOG_LEVEL_KEY } from '#common/shared/const-enum/CE_LOG_LEVEL';
import { Injectable, type LoggerService } from '@nestjs/common';
import { existsSync } from 'fs';
import * as os from 'os';
import * as winston from 'winston';

const applogFilename = existsSync('/var/log/nodejs') ? '/var/log/nodejs/nodejs.log' : './logs/app.log';

function getLogName(name?: string): CE_LOG_LEVEL_KEY {
  if (
    name === 'emerg' ||
    name === 'alert' ||
    name === 'crit' ||
    name === 'err' ||
    name === 'warning' ||
    name === 'notice' ||
    name === 'info' ||
    name === 'debug'
  ) {
    return name;
  }

  return 'info';
}

@Injectable()
export class WinstonService implements LoggerService {
  private logger: winston.Logger;
  private logLevel: CE_LOG_LEVEL_KEY;

  constructor() {
    // TODO: config 정보로 LOG LEVEL 정의 필요
    this.logLevel = getLogName();

    this.logger = winston.createLogger({
      level: this.logLevel,
      levels: CE_LOG_LEVEL,
      defaultMeta: {
        logger: 'app',
        pid: process.pid,
      },
      transports: [
        new winston.transports.File({
          level: this.logLevel,
          filename: applogFilename,
          eol: os.EOL,
          format: winston.format.combine(winston.format.printf((info) => JSON.stringify(info))),

          // format: winston.format.combine(
          //   //
          //   winston.format.timestamp(),

          //   //
          //   winston.format.printf((info) => {
          //     try {
          //       // 메시지를 삭제한다
          //       const { other } = info;
          //       const colored = winston.format
          //         .colorize()
          //         .colorize(
          //           other.level,
          //           `[${other.timestamp ?? ''} ${other.level} ${other.logger ?? ''} ${other.req_method ?? ''}]: `,
          //         );
          //       return `${colored} ${JSON.stringify(other)}`;
          //     } catch {
          //       return '{}';
          //     }
          //   }),
          // ),
        }),
      ],
    });

    winston.addColors(CE_LOG_COLOR);
  }

  logging(message) {
    this.logger[this.logLevel]('', message);
  }

  emerg(message) {
    this.logger.log('emerg', message);
  }

  alert(message) {
    this.logger.log('alert', message);
  }

  crit(message) {
    this.logger.log('cirt', message);
  }

  err(message) {
    this.logger.log('err', message);
  }

  error(message) {
    this.logger.log('err', message);
  }

  warn(message) {
    this.logger.log('warning', message);
  }

  warning(message) {
    this.logger.log('warning', message);
  }

  notice(message) {
    this.logger.log('notice', message);
  }

  info(message) {
    this.logger.log('info', message);
  }

  debug(message) {
    this.logger.debug(message);
  }

  verbose(message) {
    this.logger.verbose(message);
  }

  log(message) {
    this.logger.info('', message);
  }
}
