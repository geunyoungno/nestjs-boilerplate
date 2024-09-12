import { HealthService } from '#operation/service/health.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [HealthService],
  exports: [HealthService],
})
export class OperationModule {}
