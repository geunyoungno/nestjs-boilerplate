import { CommonModule } from '#common/common.module';
import { HealthModule } from '#health/health.module';
import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    //
    CommonModule,
    HealthModule,
    UserModule,
    UserModule,
  ],
})
export class AppModule {}
