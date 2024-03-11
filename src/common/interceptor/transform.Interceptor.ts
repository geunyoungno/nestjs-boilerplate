import { ResJsendDto } from '#common/http/dto/res-jsend.dto';
import { Injectable, type CallHandler, type ExecutionContext, type NestInterceptor } from '@nestjs/common';
import { type Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, ResJsendDto<T>> {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<ResJsendDto<T>> {
    return next.handle().pipe(
      map((data) => {
        return new ResJsendDto({ data });
      }),
    );
  }
}
