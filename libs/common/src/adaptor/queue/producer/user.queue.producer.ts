import { CE_TRADE_QUEUE_NAME } from '#common/adaptor/queue/const-enum/CE_QUEUE_NAME';
import { AbstractQueueProducer } from '#common/adaptor/queue/producer/abstract.queue.producer';
import { IQueueSchema, TQueue } from '#common/adaptor/queue/queue.type';
import { UserQueueService } from '#common/adaptor/queue/service/user.queue.service';
import { LoggerService } from '#framework/logger/logger.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class UserQueueProducer extends AbstractQueueProducer<IQueueSchema[typeof CE_TRADE_QUEUE_NAME.USER_QUEUE]> {
  constructor(
    @InjectQueue(CE_TRADE_QUEUE_NAME.USER_QUEUE) queue: TQueue<typeof CE_TRADE_QUEUE_NAME.USER_QUEUE>,
    clsService: ClsService,
    loggerService: LoggerService,
    private readonly userQueueService: UserQueueService,
  ) {
    super({ queue, loggerService, clsService });
  }

  isValid<K extends keyof InstanceType<typeof UserQueueService>['validRecord']>(
    args: K,
  ): InstanceType<typeof UserQueueService>['validRecord'][K] {
    return this.userQueueService.isValid(args);
  }
}
