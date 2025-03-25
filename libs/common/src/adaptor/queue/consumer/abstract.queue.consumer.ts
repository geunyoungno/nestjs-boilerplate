import { type IQueueSchema, type TWrapQueueJobPayload } from '#common/adaptor/queue/queue.type';
import { CE_LOG_DISCRIMINATOR } from '#framework/logger/const-enum/CE_LOG_DISCRIMINATOR';
import { type LoggerService } from '#framework/logger/logger.service';
import { WorkerHost } from '@nestjs/bullmq';
import { type Job, type Worker, type WorkerListener } from 'bullmq';
import { type ValueOf } from 'type-fest';

export abstract class AbstractQueueConsumer<TJonPayload extends ValueOf<IQueueSchema>> extends WorkerHost<
  Worker<TWrapQueueJobPayload<TJonPayload>>
> {
  private _loggerService: LoggerService;

  protected loggingRecord: Record<Extract<CE_LOG_DISCRIMINATOR, `${'queue_consumer'}_${string}`>, boolean> = {
    [CE_LOG_DISCRIMINATOR.QUEUE_CONSUMER_ACTIVE]: true,
    [CE_LOG_DISCRIMINATOR.QUEUE_CONSUMER_COMPLETED]: true,
    [CE_LOG_DISCRIMINATOR.QUEUE_CONSUMER_ERROR]: true,
    [CE_LOG_DISCRIMINATOR.QUEUE_CONSUMER_FAILED]: true,
  };

  constructor({ loggerService }: { loggerService: LoggerService }) {
    super();

    this._loggerService = loggerService;
  }

  onApplicationBootstrap() {
    this.setEventListeners(this.worker);
  }

  /**
   * OnQueueEvent를 사용하여 등록하고 싶었는데 QueueEventsHost class를 상속받아 구현해야 되었다.
   * worker가 onModuleInit 후에에 초기화 되어서 onApplicationBootstrap애 worker를 사용하여 event listener를 등록하였다.
   */
  private setEventListeners(worker: Worker<TWrapQueueJobPayload<TJonPayload>>) {
    worker.on('active', this.onActive.bind(this)); // process 전에 호출됨
    worker.on('completed', this.onCompleted.bind(this)); // process 완료
    worker.on('error', this.onError.bind(this)); // 에러 발생
    worker.on('failed', this.onFailed.bind(this)); // process 실패
  }

  private onActive(
    job: Job<TWrapQueueJobPayload<TJonPayload>, unknown, ValueOf<Pick<TJonPayload, 'discriminator'>>>,
    _prev: Parameters<WorkerListener['active']>[1],
  ) {
    if (this.loggingRecord[CE_LOG_DISCRIMINATOR.QUEUE_CONSUMER_ACTIVE] === false) {
      return;
    }

    const payload = { id: job.id, data: job.data, name: job.name, token: job.token };
    this._loggerService.queueConsumerActive({ id: job.data.id, payload, req_url: this.constructor.name });
  }

  private onCompleted(
    job: Job<TWrapQueueJobPayload<TJonPayload>, unknown, ValueOf<Pick<TJonPayload, 'discriminator'>>>,
    result: Parameters<WorkerListener['completed']>[1],
    _prev: Parameters<WorkerListener['completed']>[2],
  ) {
    if (this.loggingRecord[CE_LOG_DISCRIMINATOR.QUEUE_CONSUMER_COMPLETED] === false) {
      return;
    }

    const payload = { id: job.id, data: job.data, name: job.name, token: job.token, result };
    this._loggerService.queueConsumerCompleted({ id: job.data.id, payload, req_url: this.constructor.name });
  }

  private onError(error: Parameters<WorkerListener['error']>[0]) {
    if (this.loggingRecord[CE_LOG_DISCRIMINATOR.QUEUE_CONSUMER_ERROR] === false) {
      return;
    }

    this._loggerService.queueConsumerError({ err: error, req_url: this.constructor.name });
  }

  private onFailed(
    job: Job<TWrapQueueJobPayload<TJonPayload>, unknown, ValueOf<Pick<TJonPayload, 'discriminator'>>>,
    error: Parameters<WorkerListener['failed']>[1],
    _prev: Parameters<WorkerListener['failed']>[2],
  ) {
    if (this.loggingRecord[CE_LOG_DISCRIMINATOR.QUEUE_CONSUMER_FAILED] === false) {
      return;
    }

    const payload = { id: job.id, data: job.data, name: job.name, token: job.token };
    this._loggerService.queueConsumerFailed({ id: job.data.id, payload, err: error, req_url: this.constructor.name });

    // 재시도 횟수를 이상인데도 실패할 경우 처리
    if (job.attemptsMade >= (job.opts.attempts ?? 0)) {
      // TODO: 재시도 횟수를 초과하여 실패한 경우에 대한 처리를 추가해야 한다. slack 알림 등을 추가하는 것이 좋을 것 같은데...
      this._loggerService.trace('exceed retry limit', {
        id: job.id,
        attemptsMade: job.attemptsMade,
        attempts: job.opts.attempts,
      });
    }
  }
}
