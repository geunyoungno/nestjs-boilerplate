import { CommonModule } from '#common/common.module';
import { HealthModule } from '#health/health.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    //
    CommonModule,
    HealthModule,
  ],
})
export class AppModule {}
