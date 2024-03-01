import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

/**
 * 포트 번호를 가져오는 함수
 * @returns {number} 포트 번호
 */
function getPort() {
  const envPort = process.env.PORT ?? '';
  const parsedPort = parseInt(envPort, 10);

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

  await app.listen(
    getPort(),
    // 외부에서 접속할 수 있도록 하기 위해서 설정
    '0.0.0.0',
  );
}
bootstrap();
