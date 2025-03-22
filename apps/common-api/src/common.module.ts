import { CommonHealthController } from '#common-api/operation/controller/common-health.controller';
import { OperationModule } from '#operation/operation.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [OperationModule],
  controllers: [CommonHealthController],
  providers: [],
})
export class CommonModule {}
