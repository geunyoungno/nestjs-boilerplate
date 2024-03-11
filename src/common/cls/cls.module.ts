import { Module } from '@nestjs/common';
import { ClsModule as ContinuationLocalStorageModlue } from 'nestjs-cls';
import * as uuid from 'uuid';

@Module({
  imports: [
    ContinuationLocalStorageModlue.forRoot({
      global: true,
      middleware: {
        mount: true,
        generateId: true,
        idGenerator: (req: Request) => {
          const requestId = req.headers['X-Request-Id'] ?? req.headers['x-request-id'] ?? `auto:${uuid.v4()}`;

          return requestId;
        },
      },
    }),
  ],
})
export class ClsModule {}
