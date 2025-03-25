import { MailerModule } from '#common/adaptor/mailer/mailer.module';
import { StorageQueueService } from '#common/adaptor/queue/service/storage.queue.service';
import { UserQueueService } from '#common/adaptor/queue/service/user.queue.service';
import { StorageModule } from '#storage/storage.module';
import { UserModule } from '#user/user.module';
import { Module, Provider } from '@nestjs/common';

const services: Provider[] = [StorageQueueService, UserQueueService];

@Module({
  imports: [MailerModule, StorageModule, UserModule],
  providers: [...services],
  exports: [...services],
})
export class QueueServiceModule {}
