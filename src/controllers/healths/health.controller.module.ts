import { HealthController } from '#controllers/healths/health.controller';
import { HealthService } from '#providers/healths/health.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthControllerModule {}
