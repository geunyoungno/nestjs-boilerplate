import isEmpty from '#common/shared/tool/isEmpty';
import { ConfigModule } from '#framework/config/config.module';
import { CE_REDIS_KEY } from '#framework/config/const-enum/CE_REDIS_KEY';
import { IConfigDto } from '#framework/config/dto/config.dto.type';
import { BullModule } from '@nestjs/bullmq';
import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisOptions } from 'bullmq';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const redisConfig = configService.get<IConfigDto['redis']>('redis');
        const nestRedis = redisConfig?.[CE_REDIS_KEY.NEST_REDIS];

        if (isEmpty(nestRedis)) {
          throw new Error('redis config invalid');
        }

        const redisPassword = isEmpty(process.env.REDIS_PASSWORD) ? undefined : process.env.REDIS_PASSWORD;
        const useTls = nestRedis.tls ?? false;

        return {
          connection: {
            db: nestRedis.db.queue,
            host: nestRedis.host,
            password: redisPassword,
            port: nestRedis.port,
            tls: useTls === true ? {} : undefined,
          } satisfies RedisOptions,
        };
      },
    }),
  ],
})
export class BullQueueModule {}
