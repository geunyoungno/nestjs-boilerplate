import { ClsModule } from '#framework/cls/cls.module';
import { ConfigModule } from '#framework/config/config.module';
import { CorsModule } from '#framework/cors/cors.module';
import { EventEmitterModule } from '#framework/event-emitter/event-emitter.module';
import { FilterModule } from '#framework/filter/filter.module';
import { HelmetModule } from '#framework/helmet/helmet.module';
import { InterceptorModule } from '#framework/interceptor/interceptor.module';
import { LoggerModule } from '#framework/logger/logger.module';
import { SwaggerModule } from '#framework/swagger/swagger.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ClsModule,
    ConfigModule,
    CorsModule,
    EventEmitterModule,
    FilterModule,
    HelmetModule,
    InterceptorModule,
    LoggerModule,
    SwaggerModule,
  ],
})
export class FrameworkModule {}
