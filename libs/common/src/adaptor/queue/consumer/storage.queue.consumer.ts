import { CE_QUEUE_DESTINATION } from '#common/adaptor/queue/const-enum/CE_QUEUE_DESTINATION';
import { CE_TRADE_QUEUE_NAME } from '#common/adaptor/queue/const-enum/CE_QUEUE_NAME';
import { CE_QUEUE_STAGE } from '#common/adaptor/queue/const-enum/CE_QUEUE_STAGE';
import { AbstractQueueConsumer } from '#common/adaptor/queue/consumer/abstract.queue.consumer';
import { IQueueSchema, TJob } from '#common/adaptor/queue/queue.type';
import { StorageQueueService } from '#common/adaptor/queue/service/storage.queue.service';
import { LoggerService } from '#framework/logger/logger.service';
import { Processor } from '@nestjs/bullmq';

@Processor(CE_TRADE_QUEUE_NAME.STORAGE_QUEUE)
export class StorageQueueConsumer extends AbstractQueueConsumer<
  IQueueSchema[typeof CE_TRADE_QUEUE_NAME.STORAGE_QUEUE]
> {
  constructor(
    loggerService: LoggerService,
    private storageQueueService: StorageQueueService,
  ) {
    super({ loggerService });
  }

  async process(job: TJob<typeof CE_TRADE_QUEUE_NAME.STORAGE_QUEUE>, _token?: string) {
    if (
      job.data.discriminator === 'thumbnail' &&
      job.data.stage === CE_QUEUE_STAGE.MID &&
      job.data.destination === CE_QUEUE_DESTINATION.AWS_S3
    ) {
      return await this.storageQueueService.thumbnailMidAwsS3(job.data);
    }

    return false;
  }
}
