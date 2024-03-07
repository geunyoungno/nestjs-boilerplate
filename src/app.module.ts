import { CommonModule } from '#common/common.module';
import { HealthModule } from '#health/health.module';
import { UserModule } from '#user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    //
    CommonModule,
    HealthModule,
    UserModule,
  ],
})
export class AppModule {}
