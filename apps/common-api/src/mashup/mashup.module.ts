import { CommonModule } from '#common-api/common.module';
import { ExternalModule } from '#external-api/external.module';
import { PlatformModule } from '#platform-api/platform.module';
import { Module } from '@nestjs/common';

/**
 * 추후 mashup 으로 각각 분리될 controller들을 관리함
 */
@Module({
  imports: [CommonModule, ExternalModule, PlatformModule],
})
export class MashupModule {}
