import { HealthService } from '#health/health.service';
import { Module } from '@nestjs/common';
import { HealthController } from './controller/health.controller';

@Module({
  providers: [HealthService],
  controllers: [HealthController],
})
export class HealthModule {}
