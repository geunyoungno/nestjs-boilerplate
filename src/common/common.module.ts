import { ClsModule } from '#common/cls/cls.module';
import { ConfigModule } from '#common/config/config.module';
import { DatabaseModule } from '#common/database/database.module';
import { FilterModule } from '#common/filter/filter.module';
import { HelmetModule } from '#common/helmet/helmet.module';
import { InterceptorModule } from '#common/interceptor/interceptor.module';
import { LoggerModule } from '#common/logger/logger.module';
import { SwaggerModule } from '#common/swagger/swagger.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ClsModule,
    ConfigModule,
    DatabaseModule,
    FilterModule,
    HelmetModule,
    InterceptorModule,
    LoggerModule,
    SwaggerModule,
  ],
})
export class CommonModule {}
