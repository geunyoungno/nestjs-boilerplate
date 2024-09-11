import { JsendDto } from '#common/shared/dto/res/res-jsend.dto';
import { getReply, getReq } from '#common/shared/http/httpHelper';
import { LoggerService } from '#framework/logger/logger.service';
import {
  BadRequestException,
  Catch,
  HttpException,
  HttpStatus,
  type ArgumentsHost,
  type HttpExceptionBody,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(private logger: LoggerService) {
    super();
  }

  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      return this.catchHttpexceptiopn(exception, host);
    }

    const err = exception instanceof Error ? exception : new Error(`${exception}`);

    return this.catchError(err, host);
  }

  catchHttpexceptiopn(exception: HttpException, host: ArgumentsHost) {
    const req = getReq(host);
    const reply = getReply(host);
    const status = exception.getStatus();

    const err = exception.getResponse() as string | HttpExceptionBody;

    // 400 오류
    if (exception instanceof BadRequestException) {
      const replyData =
        typeof err === 'string'
          ? {
              code: `${exception.name}`,
              data: [exception.message],
            }
          : {
              code: err.error,
              data: err.message,
            };

      this.logger.httpErr({
        req,
        reply,
        replyData,
        err: exception,
      });

      return reply.status(status).send(new JsendDto(replyData));
    }

    // 400 이외의 오류
    const replyData = {
      code: exception.name,
      message: exception.message,
    };

    this.logger.httpErr({
      req,
      reply,
      replyData,
      err: exception,
    });

    return reply.status(status).send(new JsendDto(replyData));
  }

  catchError(exception: Error, host: ArgumentsHost) {
    const req = getReq(host);
    const reply = getReply(host);
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    reply.status(status);

    const replyData = {
      code: exception.name,
      data: [exception.message],
    };

    this.logger.httpErr({
      req,
      reply,
      replyData,
      err: exception,
    });

    return reply.status(status).send(new JsendDto(replyData));
  }
}
