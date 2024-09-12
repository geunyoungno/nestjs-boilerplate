import { CommonMashupModule } from '#mashup/common/common.module';
import { Module } from '@nestjs/common';

/**
 * 추후 mashup 으로 각각 분리될 controller들을 관리함
 */
@Module({
  imports: [CommonMashupModule],
})
export class MashupModule {}
