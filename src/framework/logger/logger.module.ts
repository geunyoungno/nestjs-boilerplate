import { LoggerService } from '#framework/logger/logger.service';
import { WinstonService } from '#framework/logger/winston.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [],
  providers: [WinstonService, LoggerService],
  exports: [WinstonService, LoggerService],
})
export class LoggerModule {}
