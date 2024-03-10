import { LoggerService } from '#common/logger/logger.service';
import { WinstonService } from '#common/logger/winston.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [],
  providers: [WinstonService, LoggerService],
  exports: [WinstonService, LoggerService],
})
export class LoggerModule {}
