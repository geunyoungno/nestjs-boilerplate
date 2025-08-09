import { type IQueueSchema, type TWrapQueueJobPayload } from '#common/adaptor/queue/queue.type';
import { type TValueOf } from '#common/shared/dto/utility.type';
import { CE_LOG_DISCRIMINATOR } from '#framework/logger/const-enum/CE_LOG_DISCRIMINATOR';
import { type LoggerService } from '#framework/logger/logger.service';
import { type BaseJobOptions, type Job, type JobsOptions, type Queue } from 'bullmq';
import { type ClsService } from 'nestjs-cls';
import * as uuid from 'uuid';

export abstract class AbstractQueueProducer<TJonPayload extends TValueOf<IQueueSchema>> {
  private _loggerService: LoggerService;
  private _clsService: ClsService;

  private queue: Queue<
    TWrapQueueJobPayload<TJonPayload>,
    unknown,
    TValueOf<Pick<TJonPayload, 'discriminator'>>,
    TWrapQueueJobPayload<TJonPayload>,
    unknown,
    TValueOf<Pick<TJonPayload, 'discriminator'>>
  >;
  private readonly defaultOption = {
    removeOnComplete: true, // 성공한 작업은 자동으로 삭제
    attempts: 3, // 최대 재시도 횟수
    // 재시도 간격 @see https://docs.bullmq.io/guide/retrying-failing-jobs#built-in-backoff-strategies
    backoff: { type: 'exponential', delay: 1000 },
  } satisfies JobsOptions;
  private option: JobsOptions = {};

  protected loggingRecord: Record<Extract<CE_LOG_DISCRIMINATOR, `${'queue_producer'}_${string}`>, boolean> = {
    [CE_LOG_DISCRIMINATOR.QUEUE_PRODUCER_ADDED]: true,
    [CE_LOG_DISCRIMINATOR.QUEUE_PRODUCER_ERROR]: true,
  };

  constructor({
    queue,
    option,
    loggerService,
    clsService,
  }: {
    queue: Queue<TWrapQueueJobPayload<TJonPayload>, unknown, TValueOf<Pick<TJonPayload, 'discriminator'>>>;
    option?: JobsOptions;
    loggerService: LoggerService;
    clsService: ClsService;
  }) {
    this.queue = queue;
    this.option = { ...this.defaultOption, ...option };

    this._loggerService = loggerService;
    this._clsService = clsService;

    queue.on('error', (error) => {
      this.onError(error);
    });
  }

  private getClsId() {
    return { requestId: this._clsService.get('requestId'), userUuid: this._clsService.get('userUuid') };
  }

  private onAdded(job: Job<TWrapQueueJobPayload<TJonPayload>, unknown, TValueOf<Pick<TJonPayload, 'discriminator'>>>) {
    if (this.loggingRecord[CE_LOG_DISCRIMINATOR.QUEUE_PRODUCER_ADDED] === false) {
      return;
    }

    const payload = { id: job.id, data: job.data, name: job.name, token: job.token };
    this._loggerService.queueProducerAdded({ payload, req_url: this.constructor.name });
  }

  private onError(error: Error) {
    if (this.loggingRecord[CE_LOG_DISCRIMINATOR.QUEUE_PRODUCER_ERROR] === false) {
      return;
    }

    this._loggerService.queueProducerError({ err: error, req_url: this.constructor.name });
  }

  /** queue 추가 유효 여부 */
  public static isValid(_args: unknown): boolean {
    return true;
  }

  /**
   * queue 작업 추가
   */
  async add(jobPayload: TJonPayload, option?: Pick<BaseJobOptions, 'jobId' | 'delay'>) {
    const wrappedJobPayload = {
      ...jobPayload,
      id: this.getClsId(),
    } satisfies TWrapQueueJobPayload<TJonPayload>;

    const added = await this.queue.add(jobPayload.discriminator, wrappedJobPayload, {
      ...this.option,
      ...option,
      jobId: option?.jobId ?? uuid.v4(),
    });

    this.onAdded(added);

    return added;
  }
}
