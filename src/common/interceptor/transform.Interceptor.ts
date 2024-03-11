import { JsendDto } from '#common/dto/res-jsend.dto';
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, JsendDto<T>> {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<JsendDto<T>> {
    return next.handle().pipe(map((data) => new JsendDto({ data })));
  }
}
