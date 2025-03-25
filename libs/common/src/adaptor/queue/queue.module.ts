import { BullQueueModule } from '#common/adaptor/queue/bull.queue.module';
import { QueueConsumerModule } from '#common/adaptor/queue/queue.consumer.module';
import { QueueProducerModule } from '#common/adaptor/queue/queue.producer.module';
import { QueueServiceModule } from '#common/adaptor/queue/queue.service.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [BullQueueModule, QueueConsumerModule, QueueProducerModule, QueueServiceModule],
})
export class QueueModule {}
