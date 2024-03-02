import { HealthControllerModule } from '#controllers/healths/health.controller.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [HealthControllerModule],
})
export class ControllerModule {}
