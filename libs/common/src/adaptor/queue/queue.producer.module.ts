import { CE_TRADE_QUEUE_NAME } from '#common/adaptor/queue/const-enum/CE_QUEUE_NAME';
import { StorageQueueProducer } from '#common/adaptor/queue/producer/storage.queue.producer';
import { UserQueueProducer } from '#common/adaptor/queue/producer/user.queue.producer';
import { QueueServiceModule } from '#common/adaptor/queue/queue.service.module';
import { BullModule } from '@nestjs/bullmq';
import { Global, Module, Provider } from '@nestjs/common';

const producers: Provider[] = [StorageQueueProducer, UserQueueProducer];

@Global()
@Module({
  imports: [
    BullModule.registerQueue(...Object.values(CE_TRADE_QUEUE_NAME).map((name) => ({ name }))),
    QueueServiceModule,
  ],
  providers: [...producers],
  exports: [...producers],
})
export class QueueProducerModule {}
