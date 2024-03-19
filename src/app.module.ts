import { CommonModule } from '#common/common.module';
import { FileModule } from '#file/file.module';
import { HealthModule } from '#health/health.module';
import { UserModule } from '#user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    //
    CommonModule,
    FileModule,
    HealthModule,
    UserModule,
  ],
})
export class AppModule {}
