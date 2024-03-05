import { WinstonPluginModule } from '#plugins/winston/winston.module';
import { HealthService } from '#providers/healths/health.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [WinstonPluginModule],
  providers: [HealthService],
})
export class HealthServiceModule {}