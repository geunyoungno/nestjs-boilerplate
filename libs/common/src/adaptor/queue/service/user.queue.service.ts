import { MailService } from '#common/adaptor/mailer/service/mail.service';
import { CE_QUEUE_DESTINATION } from '#common/adaptor/queue/const-enum/CE_QUEUE_DESTINATION';
import { CE_TRADE_QUEUE_NAME } from '#common/adaptor/queue/const-enum/CE_QUEUE_NAME';
import { CE_QUEUE_STAGE } from '#common/adaptor/queue/const-enum/CE_QUEUE_STAGE';
import { IQueueSchema } from '#common/adaptor/queue/queue.type';
import { LoggerService } from '#framework/logger/logger.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserQueueService {
  public readonly validRecord = {};

  isValid<K extends keyof InstanceType<typeof UserQueueService>['validRecord']>(
    key: K,
  ): InstanceType<typeof UserQueueService>['validRecord'][K] {
    return this.validRecord[key];
  }

  constructor(
    private readonly loggerService: LoggerService,
    private readonly mailService: MailService,
  ) {}

  // SECTION - 회원가입 전처리, 인증 메일 발송
  async signupPreEmail(
    args: Extract<
      IQueueSchema[typeof CE_TRADE_QUEUE_NAME.USER_QUEUE],
      {
        discriminator: 'signup';
        stage: typeof CE_QUEUE_STAGE.PRE;
        destination: typeof CE_QUEUE_DESTINATION.EMAIL;
      }
    >,
  ) {
    try {
      const { sended, sendOption } = await this.mailService.userSignupVerification(args);

      this.loggerService.commonInfo({
        data: { args, sended, sendOption },
        req_url: [this.constructor.name, 'signupPreEmail'].join('.'),
      });

      return true;
    } catch (catched) {
      this.loggerService.commonError({
        err: catched instanceof Error ? catched : new Error(`${catched}`),
        req_url: [this.constructor.name, 'signupPreEmail'].join('.'),
        data: { args },
      });

      // 재시도를 위해서 에러를 다시 던진다.
      throw catched;
    }
  }
  // !SECTION

  // SECTION - 비밀번호 재발송 전처리, 비회원 비밀번호 재발송
  async resetPasswordPreEmail(
    args: Extract<
      IQueueSchema[typeof CE_TRADE_QUEUE_NAME.USER_QUEUE],
      {
        discriminator: 'reset-password';
        stage: typeof CE_QUEUE_STAGE.PRE;
        destination: typeof CE_QUEUE_DESTINATION.EMAIL;
      }
    >,
  ) {
    try {
      const { sended, sendOption } = await this.mailService.guestResetPasswordVerification(args);

      this.loggerService.commonInfo({
        data: { args, sended, sendOption },
        req_url: [this.constructor.name, 'resetPasswordPreEmail'].join('.'),
      });

      return true;
    } catch (catched) {
      this.loggerService.commonError({
        err: catched instanceof Error ? catched : new Error(`${catched}`),
        req_url: [this.constructor.name, 'resetPasswordPreEmail'].join('.'),
        data: { args },
      });

      // 재시도를 위해서 에러를 다시 던진다.
      throw catched;
    }
  }
  // !SECTION
}
