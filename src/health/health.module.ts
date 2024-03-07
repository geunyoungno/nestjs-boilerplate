import { HealthController } from '#health/controller/health.controller';
import { HealthService } from '#health/health.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [HealthService],
  controllers: [HealthController],
})
export class HealthModule {}
