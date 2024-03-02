import { HealthService } from '#providers/healths/health.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [HealthService],
})
export class HealthServiceModule {}
