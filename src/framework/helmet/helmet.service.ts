import { CE_RUN_MODE } from '#common/shared/const-enum/CE_RUN_MODE';
import fastifyHelmet, { FastifyHelmetOptions } from '@fastify/helmet';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type NestFastifyApplication } from '@nestjs/platform-fastify';

@Injectable()
export class HelmetService {
  constructor(private options?: FastifyHelmetOptions) {}

  async bootstrap(app: NestFastifyApplication) {
    const runMode = app.get(ConfigService).get<CE_RUN_MODE>('server.runMode', CE_RUN_MODE.LOCAL);

    const options =
      runMode === CE_RUN_MODE.LOCAL
        ? {
            ...this.options,
            contentSecurityPolicy: false,
          }
        : this.options;

    await app.register(fastifyHelmet, options);
  }
}
