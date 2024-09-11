import { CommonModule } from '#common/common.module';
import { FrameworkModule } from '#framework/framework.module';
import { HealthModule } from '#health/health.module';
import { StorageModule } from '#storage/storage.module';
import { UserModule } from '#user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CommonModule, HealthModule, StorageModule, UserModule, FrameworkModule],
})
export class AppModule {}
