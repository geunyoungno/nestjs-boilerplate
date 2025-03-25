import { type CE_QUEUE_DESTINATION } from '#common/adaptor/queue/const-enum/CE_QUEUE_DESTINATION';
import { type CE_QUEUE_NAME, type CE_TRADE_QUEUE_NAME } from '#common/adaptor/queue/const-enum/CE_QUEUE_NAME';
import { type CE_QUEUE_STAGE } from '#common/adaptor/queue/const-enum/CE_QUEUE_STAGE';
import { type IUserEntity } from '#user/entity/user.entity.type';
import { type Job, type Queue } from 'bullmq';
import { type ValueOf } from 'type-fest';

export type TWrapQueueJobPayload<TJobPayload extends ValueOf<IQueueSchema>> = TJobPayload & {
  id: {
    /** Request 고유 번호 */
    requestId: string;

    /** 사용자 UUID */
    userUuid?: string;
  };
};

export type TQueue<TQueueName extends CE_QUEUE_NAME> = Queue<
  TWrapQueueJobPayload<IQueueSchema[TQueueName]>,
  unknown,
  IQueueSchema[TQueueName]['discriminator']
>;

export type TJob<TQueueName extends CE_QUEUE_NAME> = Job<
  TWrapQueueJobPayload<IQueueSchema[TQueueName]>,
  unknown,
  ValueOf<Pick<IQueueSchema[TQueueName], 'discriminator'>>
>;

export interface IQueuePayload {
  /** 큐 동작 */
  discriminator: string;

  /** 큐 서브 동작 */
  subDiscriminator?: string;

  /** 큐 단계 */
  stage: CE_QUEUE_STAGE;

  /** 큐 목적지 */
  destination: CE_QUEUE_DESTINATION;

  /** 큐 정보 */
  payload: Record<string, unknown>;
}

export interface IQueueSchema extends Record<CE_QUEUE_NAME, IQueuePayload> {
  // SECTION - 사용자 큐
  [CE_TRADE_QUEUE_NAME.USER_QUEUE]: // 사용자 큐
  // 회원가입 전처리 - 인증 메일 발송
  | {
        discriminator: 'signup';
        // subDiscriminator: undefined;
        stage: typeof CE_QUEUE_STAGE.PRE;
        destination: typeof CE_QUEUE_DESTINATION.EMAIL;
        payload: {
          verification: { contact: string; code: string; expiredAt: Date };
        };
      }

    // 비밀번호 재발송 전처리 - 비회원 비밀번호 재발송
    | {
        discriminator: 'reset-password';
        subDiscriminator: 'guest';
        stage: typeof CE_QUEUE_STAGE.PRE;
        destination: typeof CE_QUEUE_DESTINATION.EMAIL;
        payload: {
          user: Pick<IUserEntity, 'fullName'>;
          verification: { contact: string; code: string; expiredAt: Date };
        };
      };

  // !SECTION
  // SECTION - 저장소 큐
  [CE_TRADE_QUEUE_NAME.STORAGE_QUEUE]: // 저장소 큐
  // 이메일 썸네일 생성 작업
  {
    discriminator: 'thumbnail';
    // subDiscriminator: undefined;
    stage: typeof CE_QUEUE_STAGE.MID;
    destination: typeof CE_QUEUE_DESTINATION.AWS_S3;
    payload: { image: { uuid: string } };
  };
  // !SECTION
}
