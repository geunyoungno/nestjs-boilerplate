import { CE_RUN_MODE } from '#common/shared/const-enum/CE_RUN_MODE';
import { Injectable } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ConfigService } from '@nestjs/config';
// import { ConfigService } from '@nestjs/config';
import { type NestFastifyApplication } from '@nestjs/platform-fastify';

@Injectable()
export class CorsService {
  constructor(private options?: CorsOptions) {}

  bootstrap(app: NestFastifyApplication) {
    const runMode = app.get(ConfigService).get<CE_RUN_MODE>('server.runMode', CE_RUN_MODE.LOCAL);

    const origin: CorsOptions['origin'] = runMode === CE_RUN_MODE.LOCAL ? '*' : '*';

    const options = {
      ...this.options,
      origin,
    } satisfies CorsOptions;

    app.enableCors(options);
  }
}
