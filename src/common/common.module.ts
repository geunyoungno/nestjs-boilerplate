import { ConfigModule } from '#common/config/config.module';
import { TypeormModule } from '#common/database/typeorm.module';
import { WinstonModule } from '#common/logger/winston.module';
import { SwaggerModule } from '#common/swagger/swagger.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    //
    ConfigModule,
    SwaggerModule,
    TypeormModule,
    WinstonModule,
  ],
})
export class CommonModule {}