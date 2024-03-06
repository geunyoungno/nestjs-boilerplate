import { WinstonModule } from '#common/logger/winston.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    //
    WinstonModule,
  ],
})
export class CommonModule {}
