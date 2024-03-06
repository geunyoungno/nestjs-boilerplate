import { Injectable } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { OpenAPIObject, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

@Injectable()
export class SwaggerService {
  constructor(
    private config: Omit<OpenAPIObject, 'paths'>,
    private options?: SwaggerCustomOptions,
  ) {}

  bootstrap(app: NestFastifyApplication) {
    const document = SwaggerModule.createDocument(app, this.config);

    SwaggerModule.setup('swagger.io', app, document, this.options);
  }
}
