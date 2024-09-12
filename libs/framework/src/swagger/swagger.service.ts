import { type CE_MASHUP } from '#common/shared/const-enum/CE_MASHUP';
import { type getSwaggerConfig } from '#framework/swagger/swagger.configuration';
import { Injectable } from '@nestjs/common';
import { type NestFastifyApplication } from '@nestjs/platform-fastify';
import { SwaggerModule } from '@nestjs/swagger';

@Injectable()
export class SwaggerService {
  constructor(
    private swaggerConfigRecord: Record<
      Exclude<CE_MASHUP, typeof CE_MASHUP.COMMON>,
      ReturnType<typeof getSwaggerConfig>
    >,
  ) {}

  bootstrap(app: NestFastifyApplication) {
    // mashup 별 swagger 설정
    Object.values(this.swaggerConfigRecord).forEach(({ path, config, option, documentOption }) => {
      const document = SwaggerModule.createDocument(app, config, documentOption);

      SwaggerModule.setup(path, app, document, option);
    });
  }
}
