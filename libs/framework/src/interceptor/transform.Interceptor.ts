import { SuccessJsendDto } from '#common/shared/dto/res/jsend.dto';
import { getReply } from '#common/shared/http/httpHelper';
import { Injectable, type CallHandler, type ExecutionContext, type NestInterceptor } from '@nestjs/common';
import { type Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, SuccessJsendDto<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<SuccessJsendDto<T>> {
    const statusCode = getReply(context).statusCode;

    return next.handle().pipe(map((data) => new SuccessJsendDto({ statusCode, data })));
  }
}
