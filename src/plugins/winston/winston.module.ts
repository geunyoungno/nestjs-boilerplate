import { WinstonService } from '#plugins/winston/winston.service';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [],
  providers: [WinstonService],
  exports: [WinstonService],
})
export class WinstonPluginModule {}
