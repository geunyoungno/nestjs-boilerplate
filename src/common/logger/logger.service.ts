import { CE_LOG_DISCRIMINATOR } from '#common/const-enum/CE_LOG_DISCRIMINATOR';
import getHttpMethod from '#common/logger/getHttpMethod';
import { type ILogFormat } from '#common/logger/log-format.type';
import { WinstonService } from '#common/logger/winston.service';
import { HttpStatus, Injectable } from '@nestjs/common';
import { type FastifyReply, type FastifyRequest } from 'fastify';
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
    const requestId = this.cls.get('requestId');

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

  httpRes({ req, reply, replyData }: { req: FastifyRequest; reply: FastifyReply; replyData: unknown }) {
    const requestId = this.cls.get('requestId');

    const loggingData = {
      discriminator: CE_LOG_DISCRIMINATOR.HTTP_RESPONSE,
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
        reply: {
          header: reply.getHeaders(),
          data: replyData,
        },
      },
    } satisfies ILogFormat;

    this.logger.info(loggingData);
  }

  // 로깅을 기본적으로 interceptor 에서 진행한다.
  // 그런데 미들웨어, 가드 등에서 발생하는 error 의 경우 interceptor 로 들리지 않는다 ㅜ.ㅜ
  httpErr({
    req,
    reply,
    replyData,
    err,
  }: {
    req: FastifyRequest;
    reply: FastifyReply;
    replyData: unknown;
    err: Error;
  }) {
    const requestId = this.cls.get('requestId');

    const loggingData = {
      discriminator: CE_LOG_DISCRIMINATOR.HTTP_ERROR,
      status: reply.statusCode,
      req_method: getHttpMethod(req.method),
      req_url: req.raw.url ?? '/http/unknown',
      id: {
        requestId,
      },
      err: {
        message: err.message,
        stack: err.stack,
        cause: err.cause,
      },
      payload: {
        req: {
          header: req.headers,
          query: req.query,
          param: req.params,
          body: req.body,
        },
        reply: {
          header: reply.getHeaders(),
          data: replyData,
        },
      },
    } satisfies ILogFormat;

    this.logger.error(loggingData);
  }
}
