import { ILogFormat } from '#common/config/dto/interface/ILogFormat';
import { CE_LOG_DISCRIMINATOR } from '#common/const-enum/CE_LOG_DISCRIMINATOR';
import getHttpMethod from '#common/logger/getHttpMethod';
import { WinstonService } from '#common/logger/winston.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class LoggerService {
  constructor(
    private logger: WinstonService,
    private cls: ClsService,
  ) {}

  info(message) {
    this.logger.info(message);
  }

  httpReq({ req }: { req: FastifyRequest }) {
    const requestId = this.cls.getId();

    const loggingData = {
      discriminator: CE_LOG_DISCRIMINATOR.HTTP_REQUEST,
      status: HttpStatus.OK,
      req_method: getHttpMethod(req.method),
      req_url: req.raw.url ?? '/http/unknown',
      id: {
        requestId,
      },
      err: undefined,
      payload: {
        req: {
          header: req.headers,
          query: req.query,
          param: req.params,
          body: req.body,
        },
      },
    } satisfies ILogFormat;

    this.logger.info(loggingData);
  }

  httpRes() {}

  error() {}
}
