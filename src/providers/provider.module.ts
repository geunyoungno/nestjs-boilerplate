import { Module } from '@nestjs/common';
import { HealthServiceModule } from './healths/health.service.module';

@Module({
  imports: [HealthServiceModule],
})
export class ProviderModule {}
