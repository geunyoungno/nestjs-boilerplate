import { WinstonService } from '#common/logger/winston.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [],
  providers: [WinstonService],
  exports: [WinstonService],
})
export class WinstonModule {}
