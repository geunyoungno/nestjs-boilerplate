import { CommonHealthController } from '#mashup/common/operation/controller/common-health.controller';
import { OperationModule } from '#operation/operation.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [OperationModule],
  controllers: [CommonHealthController],
})
export class CommonMashupModule {}
