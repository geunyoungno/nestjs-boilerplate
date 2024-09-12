import { ExternalModule } from '#mashup-api/external/external.module';
import { PlatformModule } from '#mashup-api/platform/platform.module';
import { Module } from '@nestjs/common';

/**
 * 추후 mashup 으로 각각 분리될 controller들을 관리함
 */
@Module({
  imports: [ExternalModule, PlatformModule],
})
export class MashupModule {}
