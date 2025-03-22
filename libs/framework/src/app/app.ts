import { CE_RUN_MODE } from '#common/shared/const-enum/CE_RUN_MODE';
import { CorsService } from '#framework/cors/cors.service';
import { HelmetService } from '#framework/helmet/helmet.service';
import { SwaggerService } from '#framework/swagger/swagger.service';
import fastifyCookie from '@fastify/cookie';
import multiPart from '@fastify/multipart';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, type NestFastifyApplication } from '@nestjs/platform-fastify';
import { type Class } from 'type-fest';
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

/**
 * oauth passport는 express 기준으로 만들어져 있어 fastify와는 구조가 다르다.
 * 이때문에 fastify에서 passport를 사용하기 위해서는 아래와 같은 설정이 필요하다.
 * @see https://github.com/nestjs/nest/issues/5702
 * @param app {NestFastifyApplication} app
 */
const oauthPassport = (app: NestFastifyApplication) => {
  app
    .getHttpAdapter()
    .getInstance()
    .addHook('onRequest', (request, reply, done) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (reply as any).setHeader = function (key, value) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        return this.raw.setHeader(key, value);
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (reply as any).end = function () {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        this.raw.end();
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (request as any).res = reply;
      done();
    });
};

export async function bootstrap(AppModule: Class<unknown>) {
  initializeTransactionalContext();

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      // byte 단위,
      bodyLimit: 1_073_741_824, // 1 GiB
    }),
    {},
  );

  // cors 설정 추가
  app.get(CorsService).bootstrap(app);

  // helmet 사용
  await app.get(HelmetService).bootstrap(app);

  // cookie
  await app.register(fastifyCookie, {
    // secret: '', // for cookies signature
  });

  // multiPart 사용
  await app.register(multiPart, {
    limits: {
      // 419_430_400 Byte = 400 MB
      fileSize: 419_430_400, // For multipart forms, the max file size in bytes
      // fileSize: 100 * 1024 * 1024, // 설정 100mb, 라이브 챗 동영상 업로드 고려
      files: 12, // Max number of file fields
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
    }),
  );

  // 버저닝 추가
  app.enableVersioning({ type: VersioningType.URI });

  // oauth passport 설정
  oauthPassport(app);

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
