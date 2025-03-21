import { FailureJsendDto } from '#common/shared/dto/res/jsend.dto';
import { IFailureJsendDto } from '#common/shared/dto/res/jsend.dto.type';
import { getReply, getReq } from '#common/shared/http/httpHelper';
import { isNotEmpty } from '#common/shared/tool/isEmpty';
import { LoggerService } from '#framework/logger/logger.service';
import {
  BadRequestException,
  Catch,
  ConflictException,
  HttpException,
  HttpStatus,
  NotFoundException,
  UnauthorizedException,
  UnsupportedMediaTypeException,
  type ArgumentsHost,
  type HttpExceptionBody,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { kebabCase } from 'change-case-all';
import { STATUS_CODES } from 'http';

type THttpExceptionResponse = string | (HttpExceptionBody & { errorCode?: string });

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  constructor(private readonly loggerService: LoggerService) {
    super();
  }

  private getCommonErrorCode(args: { status: HttpStatus }) {
    const statusCodeName = STATUS_CODES[args.status] ?? `${HttpStatus.INTERNAL_SERVER_ERROR}`;

    return `${'common'}-${kebabCase(statusCodeName)}`;
  }

  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof HttpException) {
      return this.catchHttpException(exception, host);
    }

    const err = exception instanceof Error ? exception : new Error(`${exception}`);

    return this.catchError(err, host);
  }

  catchHttpException(exception: HttpException, host: ArgumentsHost) {
    const req = getReq(host);
    const reply = getReply(host);
    const status = exception.getStatus();

    const err = exception.getResponse() as THttpExceptionResponse;

    if (
      [
        // NOTE: 아래에 HttpException과 HttpStatus에 대해 처리할 예외를 추가한다.
        BadRequestException, // 400
        UnauthorizedException, // 401
        NotFoundException, // 404
        ConflictException, // 409
        UnsupportedMediaTypeException, // 415
      ].some((httpException) => exception instanceof httpException) ||
      // 범용 HttpException 으로 요청한 경우 처리
      (exception instanceof HttpException &&
        [
          HttpStatus.BAD_REQUEST, // 400
          HttpStatus.UNAUTHORIZED, // 401
          HttpStatus.NOT_FOUND, // 404
          HttpStatus.CONFLICT, // 409
          HttpStatus.UNSUPPORTED_MEDIA_TYPE, // 415
        ].includes(status))
    ) {
      const replyData: IFailureJsendDto =
        typeof err === 'string'
          ? {
              statusCode: status,
              error: {
                code: this.getCommonErrorCode({ status }),
                message: err,
              },
            }
          : {
              statusCode: status,
              error: {
                code:
                  'errorCode' in err && isNotEmpty(err.errorCode) ? err.errorCode : this.getCommonErrorCode({ status }),
                ...(typeof err.message === 'string' ? { message: err.message } : { errors: err.message }),
              },
            };

      this.loggerService.httpError({
        req,
        reply,
        replyData,
        err: exception,
      });

      return reply.status(status).send(new FailureJsendDto(replyData));
    }

    // 400, 401, 404, 409 이외의 오류
    const replyData = {
      statusCode: status,
      error: {
        code: this.getCommonErrorCode({ status }),
        message: exception.message,
      },
    } satisfies IFailureJsendDto;

    this.loggerService.httpError({
      req,
      reply,
      replyData,
      err: exception,
    });

    return reply.status(status).send(new FailureJsendDto(replyData));
  }

  catchError(exception: Error, host: ArgumentsHost) {
    const req = getReq(host);
    const reply = getReply(host);
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    reply.status(status);

    const replyData = {
      statusCode: status,
      error: {
        code: this.getCommonErrorCode({ status }),
        message: exception.message,
      },
    } satisfies IFailureJsendDto;

    this.loggerService.httpError({
      req,
      reply,
      replyData,
      err: exception,
    });

    return reply.status(status).send(new FailureJsendDto(replyData));
  }
}
