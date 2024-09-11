import { CommonModule } from '#common/common.module';
import { HealthModule } from '#health/health.module';
import { StorageModule } from '#storage/storage.module';
import { UserModule } from '#user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    //
    CommonModule,
    HealthModule,
    StorageModule,
    UserModule,
  ],
})
export class AppModule {}
