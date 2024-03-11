import { ClsModule } from '#common/cls/cls.module';
import { ConfigModule } from '#common/config/config.module';
import { TypeormModule } from '#common/database/typeorm.module';
import { FilterModule } from '#common/filter/filter.module';
import { InterceptorModule } from '#common/interceptor/interceptor.module';
import { LoggerModule } from '#common/logger/logger.module';
import { SwaggerModule } from '#common/swagger/swagger.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    //
    ClsModule,
    ConfigModule,
    FilterModule,
    InterceptorModule,
    LoggerModule,
    SwaggerModule,
    TypeormModule,
  ],
})
export class CommonModule {}
