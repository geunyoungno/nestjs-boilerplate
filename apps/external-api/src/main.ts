// 최상단에 두지 않으면 제대로 적용되지 않는다.
// config.dto.ts 등에서 TypeError: Reflect.getMetadata is not a function 오류가 발생하였다.
import 'reflect-metadata';

import { CE_RUN_MODE } from '#common/shared/const-enum/CE_RUN_MODE';
import { AppModule } from '#external-api/app.module';
import { CorsService } from '#framework/cors/cors.service';
import { HelmetService } from '#framework/helmet/helmet.service';
import { SwaggerService } from '#framework/swagger/swagger.service';
import multiPart from '@fastify/multipart';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import { initializeTransactionalContext } from 'typeorm-transactional';

/**
 * 포트 번호를 가져오는 함수
 * @returns {number} 포트 번호
 */
function getPort(undefinedPort?: number) {
  const envPort = undefinedPort ?? process.env.PORT ?? '';

  const parsedPort = parseInt(`${envPort}`, 10);

  if (Number.isNaN(parsedPort) === false) {
    return parsedPort;
  }

  return 3000;
}

async function bootstrap() {
  initializeTransactionalContext();

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {});

  // cors 설정 추가
  app.get(CorsService).bootstrap(app);

  // helmet 사용
  await app.get(HelmetService).bootstrap(app);

  // multiPart 사용
  await app.register(multiPart, {
    limits: {
      // "maxFileUploadSize": 10485760,
      fileSize: 10485760, // For multipart forms, the max file size in bytes
      // fileSize: 10 * 1024 * 1024, // 설정 10mb
      files: 10, // Max number of file fields
    },
    /**
     * @see https://github.com/fastify/fastify-multipart/issues/472
     * attachFieldsToBody를 true로 설정하면 file을 제대로 가져오지 못한다... ㅜ.ㅜ 이거 확인하느라 몇시간을 ㅜ.ㅜ
     */
    // attachFieldsToBody: true,
  });

  /**
   * DTO validation 활성화
   * * transformOptions.enableImplicitConversion: 묵시적 형변환
   * * validateCustomDecorators: custom param decorator 들도 validate 하도록 설정
   */
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
      validateCustomDecorators: true,
      /**
       * error meta data
       * @see https://stackoverflow.com/questions/60270468/throw-same-error-format-as-class-validator-in-nestjs
       */
      // exceptionFactory: (validationErrors: ValidationError[] = []) => {
      //   return new BadRequestException(validationErrors);
      // },

      /**
       * to object (Record<Property, Value>)
       * @see https://stackoverflow.com/questions/75581669/customize-error-message-in-nest-js-using-class-validator
       * @see https://dev.to/nithinkjoy/how-to-use-class-validator-and-return-custom-error-object-in-nestjs-562h
       */
      // exceptionFactory: (validationErrors: ValidationError[] = []) => {
      //   return new BadRequestException(
      //     validationErrors.map((error) => ({
      //       [error.property]: Object.values(error.constraints ?? {}).join(', '),
      //     })),
      //   );
      // },
    }),
  );

  // 버저닝 추가
  app.enableVersioning({ type: VersioningType.URI });

  // swagger 사용
  const runMode = app.get(ConfigService).get<CE_RUN_MODE>('server.runMode');
  if (runMode !== CE_RUN_MODE.PRODUCTION) {
    app.get(SwaggerService).bootstrap(app);
  }

  const port = getPort(app.get(ConfigService).get('server.port'));

  await app.listen(
    port,
    // 외부에서 접속할 수 있도록 하기 위해서 설정
    '0.0.0.0',
  );
}
bootstrap();
