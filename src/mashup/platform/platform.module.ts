import { PlatformFileController } from '#mashup-api/platform/storage/controller/platform-file.controller';
import { Module } from '@nestjs/common';

/**
 * 플랫폼 관련 controller
 */
@Module({
  controllers: [PlatformFileController],
})
export class PlatformModule {}
