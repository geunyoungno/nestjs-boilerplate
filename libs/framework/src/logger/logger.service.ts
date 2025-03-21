import escapeStringify from '#common/shared/tool/escapeStringify';
import isEmpty from '#common/shared/tool/isEmpty';
import { CE_LOG_DISCRIMINATOR } from '#framework/const-enum/CE_LOG_DISCRIMINATOR';
import getHttpMethod from '#framework/logger/getHttpMethod';
import { type ILogFormat } from '#framework/logger/log-format.type';
import { WinstonService } from '#framework/logger/winston.service';
import { ConsoleLogger, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import colors from 'colors';
import { type FastifyReply, type FastifyRequest } from 'fastify';
import { ClsService } from 'nestjs-cls';

function getCallerFunctionName() {
  const errorStack = new Error().stack;

  if (errorStack == null) {
    return 'UNKNOWN';
  }

  const frame = errorStack.split('\n')[3]; // loggerService를 호출한 함수의 이름을 가져온다.
  const lineNumber = frame.split(':').reverse()[1];
  const functionName = frame.split(' ')[5];

  return `${functionName}:${lineNumber}`;
}

@Injectable()
export class LoggerService {
  constructor(
    private clsService: ClsService,
    private winstonService: WinstonService,
  ) {}

  getAllId() {
    return {
      requestId: this.clsService.get('requestId'),
      userUuid: this.clsService.get('userUuid'),
    };
  }

  getId() {
    return {
      requestId: this.clsService.get('requestId'),
      userUuid: this.clsService.get('userUuid'),
    };
  }

  trace(...message) {
    const consoleLogger = new ConsoleLogger();

    consoleLogger.log(
      `${colors.yellow(`[${getCallerFunctionName()}]`)} ${colors.white(escapeStringify(message.length === 1 ? message[0] : message))}`,
    );
  }

  info(loggingData: ILogFormat) {
    this.winstonService.info({
      ...loggingData,
      timestamp: loggingData?.timestamp ?? new Date().toISOString(),
      id: this.getAllId(),
    });
  }

  // SECTION - 공통
  commonError({ err, data, req_url }: { err: Error; data?: unknown; req_url?: string }) {
    const loggingData = {
      timestamp: new Date().toISOString(),
      discriminator: CE_LOG_DISCRIMINATOR.COMMON_ERROR,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      req_method: 'UNKNOWN',
      req_url: req_url ?? '/common/error',
      id: this.getAllId(),
      err: {
        message: err.message,
        stack: err.stack,
        cause: err.cause,
      },
      payload: {
        data: isEmpty(data) ? undefined : data,
      },
    } satisfies ILogFormat;

    this.winstonService.error(loggingData);
  }

  commonInfo({ data, req_url }: { data: unknown; req_url?: string }) {
    const loggingData = {
      timestamp: new Date().toISOString(),
      discriminator: CE_LOG_DISCRIMINATOR.COMMON_INFO,
      status: HttpStatus.OK,
      req_method: 'UNKNOWN',
      req_url: req_url ?? '/common/info',
      id: this.getAllId(),
      err: undefined,
      payload: {
        data: isEmpty(data) ? undefined : data,
      },
    } satisfies ILogFormat;

    this.winstonService.info(loggingData);
  }
  // !SECTION

  // SECTION - HTTP
  // 로깅을 기본적으로 interceptor 에서 진행한다.
  // 그런데 미들웨어, 가드 등에서 발생하는 error 의 경우 interceptor 로 들리지 않는다 ㅜ.ㅜ
  httpError({
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
    const status = err instanceof HttpException ? err.getStatus() : reply.statusCode;

    const loggingData = {
      timestamp: new Date().toISOString(),
      discriminator: CE_LOG_DISCRIMINATOR.HTTP_ERROR,
      status,
      hostname: req.hostname,
      req_method: getHttpMethod(req.method),
      req_url: req.raw.url ?? '/http/unknown',
      id: this.getAllId(),
      err: {
        message: err.message,
        stack: err.stack,
        cause: err.cause,
      },
      payload: {
        req: {
          header: isEmpty(req.headers) ? undefined : req.headers,
          query: isEmpty(req.query) ? undefined : req.query,
          param: isEmpty(req.params) ? undefined : req.params,
          body: isEmpty(req.body) ? undefined : req.body,
        },
        reply: {
          header: isEmpty(reply.getHeaders()) ? undefined : reply.getHeaders(),
          data: isEmpty(replyData) ? undefined : replyData,
        },
      },
    } satisfies ILogFormat;

    this.winstonService.error(loggingData);
  }

  httpRequest({ req }: { req: FastifyRequest }) {
    const loggingData = {
      timestamp: new Date().toISOString(),
      discriminator: CE_LOG_DISCRIMINATOR.HTTP_REQUEST,
      status: HttpStatus.OK,
      hostname: req.hostname,
      req_method: getHttpMethod(req.method),
      req_url: req.raw.url ?? '/http/unknown',
      id: this.getAllId(),
      err: undefined,
      payload: {
        req: {
          header: isEmpty(req.headers) ? undefined : req.headers,
          query: isEmpty(req.query) ? undefined : req.query,
          param: isEmpty(req.params) ? undefined : req.params,
          body: isEmpty(req.body) ? undefined : req.body,
        },
      },
    } satisfies ILogFormat;

    this.winstonService.info(loggingData);
  }

  httpResponse({ req, reply, replyData }: { req: FastifyRequest; reply: FastifyReply; replyData: unknown }) {
    const loggingData = {
      timestamp: new Date().toISOString(),
      discriminator: CE_LOG_DISCRIMINATOR.HTTP_RESPONSE,
      status: reply.statusCode,
      hostname: req.hostname,
      req_method: getHttpMethod(req.method),
      req_url: req.raw.url ?? '/http/unknown',
      id: this.getAllId(),
      err: undefined,
      payload: {
        req: {
          header: isEmpty(req.headers) ? undefined : req.headers,
          query: isEmpty(req.query) ? undefined : req.query,
          param: isEmpty(req.params) ? undefined : req.params,
          body: isEmpty(req.body) ? undefined : req.body,
        },
        reply: {
          header: isEmpty(reply.getHeaders()) ? undefined : reply.getHeaders(),
          data: isEmpty(replyData) ? undefined : replyData,
        },
      },
    } satisfies ILogFormat;

    this.winstonService.info(loggingData);
  }
  // !SECTION

  // SECTION - Queue
  queueConsumerActive({
    payload,
    id,
    req_url,
  }: {
    payload: Record<string, unknown>;
    id: ILogFormat['id'];
    req_url: ILogFormat['req_url'];
  }) {
    const loggerData = {
      timestamp: new Date().toISOString(),
      discriminator: CE_LOG_DISCRIMINATOR.QUEUE_CONSUMER_ACTIVE,
      status: HttpStatus.OK,
      req_method: 'INFO',
      req_url,
      id,
      err: undefined,
      payload,
    } satisfies ILogFormat;

    this.winstonService.info(loggerData);
  }

  queueConsumerCompleted({
    payload,
    id,
    req_url,
  }: {
    payload: Record<string, unknown>;
    id: ILogFormat['id'];
    req_url: ILogFormat['req_url'];
  }) {
    const loggerData = {
      timestamp: new Date().toISOString(),
      discriminator: CE_LOG_DISCRIMINATOR.QUEUE_CONSUMER_COMPLETED,
      status: HttpStatus.OK,
      req_method: 'INFO',
      req_url,
      id,
      err: undefined,
      payload,
    } satisfies ILogFormat;

    this.winstonService.info(loggerData);
  }

  queueConsumerError({ err, req_url }: { err: Error; req_url: ILogFormat['req_url'] }) {
    const loggerData = {
      timestamp: new Date().toISOString(),
      discriminator: CE_LOG_DISCRIMINATOR.QUEUE_CONSUMER_ERROR,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      req_method: 'ERROR',
      req_url,
      id: this.getId(),
      err: {
        message: err.message,
        stack: err.stack,
        cause: err.cause,
      },
      payload: {},
    } satisfies ILogFormat;

    this.winstonService.error(loggerData);
  }

  queueConsumerFailed({
    err,
    id,
    payload,
    req_url,
  }: {
    err: Error;
    id: ILogFormat['id'];
    payload: Record<string, unknown>;
    req_url: ILogFormat['req_url'];
  }) {
    const loggerData = {
      timestamp: new Date().toISOString(),
      discriminator: CE_LOG_DISCRIMINATOR.QUEUE_CONSUMER_FAILED,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      req_method: 'ERROR',
      req_url,
      id,
      err: {
        message: err.message,
        stack: err.stack,
        cause: err.cause,
      },
      payload,
    } satisfies ILogFormat;

    this.winstonService.error(loggerData);
  }

  queueProducerAdded({ payload, req_url }: { payload: Record<string, unknown>; req_url: ILogFormat['req_url'] }) {
    const loggerData = {
      timestamp: new Date().toISOString(),
      discriminator: CE_LOG_DISCRIMINATOR.QUEUE_PRODUCER_ADDED,
      status: HttpStatus.OK,
      req_method: 'INFO',
      req_url,
      id: this.getId(),
      err: undefined,
      payload,
    } satisfies ILogFormat;

    this.winstonService.info(loggerData);
  }

  queueProducerError({ err, req_url }: { err: Error; req_url: ILogFormat['req_url'] }) {
    const loggerData = {
      timestamp: new Date().toISOString(),
      discriminator: CE_LOG_DISCRIMINATOR.QUEUE_PRODUCER_ERROR,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      req_method: 'ERROR',
      req_url,
      id: this.getId(),
      err: {
        message: err.message,
        stack: err.stack,
        cause: err.cause,
      },
      payload: {},
    } satisfies ILogFormat;

    this.winstonService.error(loggerData);
  }
  // !SECTION

  // SECTION - TypeORM
  typeormError(args: Pick<ILogFormat, 'req_url' | 'err' | 'payload'>) {
    const loggingData = {
      timestamp: new Date().toISOString(),
      discriminator: CE_LOG_DISCRIMINATOR.TYPEORM_ERROR,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      req_method: 'ERROR',
      req_url: args.req_url,
      id: this.getId(),
      err: args.err,
      payload: args.payload,
    } satisfies ILogFormat;

    this.winstonService.error(loggingData);
  }

  typeormInfo(args: Pick<ILogFormat, 'duration' | 'req_url' | 'payload'>) {
    const loggingData = {
      timestamp: new Date().toISOString(),
      discriminator: CE_LOG_DISCRIMINATOR.TYPEORM_INFO,
      status: HttpStatus.OK,
      duration: args.duration,
      req_method: 'INFO',
      req_url: args.req_url,
      id: this.getId(),
      payload: args.payload,
    } satisfies ILogFormat;

    this.winstonService.info(loggingData);
  }
  // !SECTION
}
