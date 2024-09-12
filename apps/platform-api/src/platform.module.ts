import { PlatformFileController } from '#platform-api/storage/controller/platform-file.controller';
import { UserModule } from '#user/user.module';
import { Module } from '@nestjs/common';

/**
 * 플랫폼 관련 controller
 */
@Module({
  imports: [UserModule],
  controllers: [PlatformFileController],
})
export class PlatformModule {}
