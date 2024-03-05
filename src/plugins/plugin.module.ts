import { WinstonPluginModule } from '#plugins/winston/winston.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [WinstonPluginModule],
})
export class PluginModule {}
