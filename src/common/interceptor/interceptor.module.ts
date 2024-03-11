import { LoggingInterceptor } from '#common/interceptor/logging.interceptor';
import { TransformInterceptor } from '#common/interceptor/transform.Interceptor';
import { Module, Scope } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      scope: Scope.REQUEST,
      useClass: TransformInterceptor,
    },
  ],
})
export class InterceptorModule {}
