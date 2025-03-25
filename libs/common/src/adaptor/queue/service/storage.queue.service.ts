import { CE_QUEUE_DESTINATION } from '#common/adaptor/queue/const-enum/CE_QUEUE_DESTINATION';
import { CE_TRADE_QUEUE_NAME } from '#common/adaptor/queue/const-enum/CE_QUEUE_NAME';
import { CE_QUEUE_STAGE } from '#common/adaptor/queue/const-enum/CE_QUEUE_STAGE';
import { IQueueSchema } from '#common/adaptor/queue/queue.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageQueueService {
  public readonly validRecord = {
    thumbnailMidAwsS3: () => {
      return true;
    },
  };

  isValid(key: keyof typeof this.validRecord) {
    return this.validRecord[key];
  }

  constructor() {}

  async thumbnailMidAwsS3(
    args: Extract<
      IQueueSchema[typeof CE_TRADE_QUEUE_NAME.STORAGE_QUEUE],
      { discriminator: 'thumbnail'; stage: typeof CE_QUEUE_STAGE.MID; destination: typeof CE_QUEUE_DESTINATION.AWS_S3 }
    >,
  ) {
    //TODO: 추후 구현

    return args;
  }
}
