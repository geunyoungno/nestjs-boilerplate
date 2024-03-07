// 최상단에 두지 않으면 제대로 적용되지 않는다.
// config.dto.ts 등에서 TypeError: Reflect.getMetadata is not a function 오류가 발생하였다.
import 'reflect-metadata';

import { AppModule } from '#app.module';
import { SwaggerService } from '#common/swagger/swagger.service';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

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
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {});

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

  // swagger 사용
  app.get(SwaggerService).bootstrap(app);

  const port = getPort(app.get(ConfigService).get('server.port'));

  await app.listen(
    port,
    // 외부에서 접속할 수 있도록 하기 위해서 설정
    '0.0.0.0',
  );
}
bootstrap();
