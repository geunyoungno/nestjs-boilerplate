import { getReply, getReq } from '#common/http/httpHelper';
import { LoggerService } from '#common/logger/logger.service';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const req = getReq(context);

    this.request(req);

    return next.handle().pipe(tap((resBody) => this.response(getReq(context), getReply(context), resBody)));
  }

  // request 시 동작
  request(req: FastifyRequest) {
    if (this.isReqWithoutLogging(req)) {
      return;
    }

    this.logger.httpReq({ req });
  }

  // response 시 동작
  response(req: FastifyRequest, _reply: FastifyReply, _replyData: unknown, _err?: Error) {
    // addResponseTime(req);

    if (this.isReqWithoutLogging(req)) {
      return;
    }

    this.logger.httpRes();
  }

  /**
   * logging 에서 제외하는 요청인지 확인
   * @param req
   */
  isReqWithoutLogging(req: FastifyRequest) {
    const protocol = req.protocol;
    const hostname = (req.hostname ?? 'localhost:8080') !== '' ? req.hostname ?? 'localhost:8080' : 'localhost:8080';
    const url = req.raw.url ?? '';

    const reqUrl = new URL(url, `${[protocol]}://${hostname}`);
    const userAgent = req.headers['User-Agent'] ?? undefined;

    // Root 요청은 제외, health checker 요청도 제외
    if (reqUrl.pathname === '/' || reqUrl.pathname.indexOf('/health') >= 0) {
      return true;
    }

    // health checker(ELB-HealthChecker/2.0) 요청도 제외
    if (userAgent != null && userAgent.indexOf('HealthChecker') >= 0) {
      return true;
    }

    return false;
  }
}
