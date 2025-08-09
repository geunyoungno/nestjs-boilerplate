import { CE_TRADE_QUEUE_NAME } from '#common/adaptor/queue/const-enum/CE_QUEUE_NAME';
import { AbstractQueueProducer } from '#common/adaptor/queue/producer/abstract.queue.producer';
import { IQueueSchema, TQueue } from '#common/adaptor/queue/queue.type';
import { StorageQueueService } from '#common/adaptor/queue/service/storage.queue.service';
import { TArrayValues } from '#common/shared/dto/utility.type';
import { LoggerService } from '#framework/logger/logger.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class StorageQueueProducer extends AbstractQueueProducer<
  IQueueSchema[typeof CE_TRADE_QUEUE_NAME.STORAGE_QUEUE]
> {
  constructor(
    @InjectQueue(CE_TRADE_QUEUE_NAME.STORAGE_QUEUE) queue: TQueue<typeof CE_TRADE_QUEUE_NAME.STORAGE_QUEUE>,
    clsService: ClsService,
    loggerService: LoggerService,
    private readonly storageQueueService: StorageQueueService,
  ) {
    super({ queue, loggerService, clsService });
  }

  isValid(args: TArrayValues<Parameters<typeof this.storageQueueService.isValid>>) {
    return this.storageQueueService.isValid(args);
  }
}
