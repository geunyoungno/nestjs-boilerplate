import { PlatformFileController } from '#mashup/platform/storage/controller/platform-file.controller';
import { Module } from '@nestjs/common';

/**
 * 플랫폼 관련 controller
 */
@Module({
  controllers: [PlatformFileController],
})
export class PlatformModule {}
