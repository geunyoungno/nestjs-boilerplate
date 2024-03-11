import { CE_RUN_MODE } from '#common/const-enum/CE_RUN_MODE';
import fastifyHelmet, { FastifyHelmetOptions } from '@fastify/helmet';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { type NestFastifyApplication } from '@nestjs/platform-fastify';

@Injectable()
export class HelmetService {
  constructor(private options?: FastifyHelmetOptions) {}

  async bootstrap(app: NestFastifyApplication) {
    const runMode = app.get(ConfigService).get<CE_RUN_MODE>('server.runMode');

    const options =
      runMode === CE_RUN_MODE.PRODUCTION
        ? {
            ...this.options,
            contentSecurityPolicy: true,
          }
        : this.options;

    await app.register(fastifyHelmet, options);
  }
}
