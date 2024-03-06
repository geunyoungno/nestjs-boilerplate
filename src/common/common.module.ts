import { WinstonModule } from '#common/logger/winston.module';
import { SwaggerModule } from '#common/swagger/swagger.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    //
    WinstonModule,
    SwaggerModule,
  ],
})
export class CommonModule {}
