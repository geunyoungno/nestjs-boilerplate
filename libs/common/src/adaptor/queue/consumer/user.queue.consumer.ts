import { CE_QUEUE_DESTINATION } from '#common/adaptor/queue/const-enum/CE_QUEUE_DESTINATION';
import { CE_TRADE_QUEUE_NAME } from '#common/adaptor/queue/const-enum/CE_QUEUE_NAME';
import { CE_QUEUE_STAGE } from '#common/adaptor/queue/const-enum/CE_QUEUE_STAGE';
import { AbstractQueueConsumer } from '#common/adaptor/queue/consumer/abstract.queue.consumer';
import { IQueueSchema, TJob } from '#common/adaptor/queue/queue.type';
import { UserQueueService } from '#common/adaptor/queue/service/user.queue.service';
import { LoggerService } from '#framework/logger/logger.service';
import { Processor } from '@nestjs/bullmq';

@Processor(CE_TRADE_QUEUE_NAME.USER_QUEUE)
export class UserQueueConsumer extends AbstractQueueConsumer<IQueueSchema[typeof CE_TRADE_QUEUE_NAME.USER_QUEUE]> {
  constructor(
    loggerService: LoggerService,
    private userQueueService: UserQueueService,
  ) {
    super({ loggerService });
  }

  async process(job: TJob<typeof CE_TRADE_QUEUE_NAME.USER_QUEUE>, _token?: string) {
    if (
      job.data.discriminator === 'signup' &&
      job.data.stage === CE_QUEUE_STAGE.PRE &&
      job.data.destination === CE_QUEUE_DESTINATION.EMAIL
    ) {
      return await this.userQueueService.signupPreEmail(job.data);
    }

    if (
      job.data.discriminator === 'reset-password' &&
      job.data.stage === CE_QUEUE_STAGE.PRE &&
      job.data.destination === CE_QUEUE_DESTINATION.EMAIL
    ) {
      return await this.userQueueService.resetPasswordPreEmail(job.data);
    }

    return false;
  }
}
