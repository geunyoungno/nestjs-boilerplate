import { JsendDto } from '#common/dto/res/res-jsend.dto';
import { Injectable, type CallHandler, type ExecutionContext, type NestInterceptor } from '@nestjs/common';
import { type Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, JsendDto<T>> {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<JsendDto<T>> {
    return next.handle().pipe(
      map((data) => {
        return new JsendDto({ data });
      }),
    );
  }
}
