import { Module } from '@nestjs/common';
import { ClsModule as ContinuationLocalStorageModlue } from 'nestjs-cls';
import * as uuid from 'uuid';

@Module({
  imports: [
    ContinuationLocalStorageModlue.forRoot({
      global: true,
      middleware: {
        mount: true,
        // requestId 추가
        setup: (cls, req) => {
          const requestId = req.headers['X-Request-Id'] ?? req.headers['x-request-id'] ?? `auto:${uuid.v4()}`;

          cls.set('requestId', requestId);
        },
      },
    }),
  ],
})
export class ClsModule {}
