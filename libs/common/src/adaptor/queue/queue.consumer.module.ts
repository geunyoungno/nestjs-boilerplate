import { StorageQueueConsumer } from '#common/adaptor/queue/consumer/storage.queue.consumer';
import { UserQueueConsumer } from '#common/adaptor/queue/consumer/user.queue.consumer';
import { QueueServiceModule } from '#common/adaptor/queue/queue.service.module';
import { Module, Provider } from '@nestjs/common';

const consumers: Provider[] = [StorageQueueConsumer, UserQueueConsumer];

@Module({
  imports: [QueueServiceModule],
  providers: [...consumers],
})
export class QueueConsumerModule {}
