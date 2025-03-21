import { getReply, getReq } from '#common/shared/http/httpHelper';
import { LoggerService } from '#framework/logger/logger.service';
import { Injectable, type CallHandler, type ExecutionContext, type NestInterceptor } from '@nestjs/common';
import { HTTPMethods, type FastifyReply, type FastifyRequest } from 'fastify';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  // 응답 payload가 너무 커서 로깅하지 않을 endpoint
  private excludePayloadEndpoints: Array<{ method: Uppercase<HTTPMethods>; url: string }> = [];

  constructor(private loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const req = getReq(context);

    this.request(req);

    return next.handle().pipe(tap((replyData) => this.response(getReq(context), getReply(context), replyData)));
  }

  // request 시 동작
  request(req: FastifyRequest) {
    if (this.isReqWithoutLogging(req)) {
      return;
    }

    this.loggerService.httpRequest({ req });
  }

  // response 시 동작
  response(req: FastifyRequest, reply: FastifyReply, replyData: unknown) {
    if (this.isReqWithoutLogging(req)) {
      return;
    }

    const method: HTTPMethods = Array.isArray(req.routeOptions.method)
      ? (req.routeOptions.method.at(0) ?? 'OPTIONS')
      : req.routeOptions.method;

    const uppercaseMethod = method.toUpperCase();
    const url = req.routeOptions.url ?? ''; // querystring을 제외한 url

    // 응답 payload가 너무 커서 로깅하지 않을 endpoint
    const data = this.excludePayloadEndpoints.some(
      (endpoint) => endpoint.method === uppercaseMethod && endpoint.url === url,
    )
      ? undefined
      : replyData;

    this.loggerService.httpResponse({ req, reply, replyData: data });
  }

  /**
   * logging 에서 제외하는 요청인지 확인
   * @param req
   */
  isReqWithoutLogging(req: FastifyRequest) {
    const protocol = req.protocol;
    const hostname = (req.hostname ?? 'localhost:8080') !== '' ? (req.hostname ?? 'localhost:8080') : 'localhost:8080';
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
