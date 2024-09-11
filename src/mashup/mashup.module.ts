import { CommonMashupModule } from '#mashup/common/common.module';
import { ExternalModule } from '#mashup/external/external.module';
import { PlatformModule } from '#mashup/platform/platform.module';
import { Module } from '@nestjs/common';

/**
 * 추후 mashup 으로 각각 분리될 controller들을 관리함
 */
@Module({
  imports: [CommonMashupModule, ExternalModule, PlatformModule],
})
export class MashupModule {}
