import { CE_MAIL_SUBJECT } from '#common/adaptor/mailer/const-enum/CE_MAIL_SUBJECT';
import { CE_MAIL_TYPE } from '#common/adaptor/mailer/const-enum/CE_MAIL_TYPE';
import { CE_QUEUE_DESTINATION } from '#common/adaptor/queue/const-enum/CE_QUEUE_DESTINATION';
import { CE_TRADE_QUEUE_NAME } from '#common/adaptor/queue/const-enum/CE_QUEUE_NAME';
import { CE_QUEUE_STAGE } from '#common/adaptor/queue/const-enum/CE_QUEUE_STAGE';
import { IQueueSchema } from '#common/adaptor/queue/queue.type';
import { CE_RUN_MODE } from '#common/shared/const-enum/CE_RUN_MODE';
import { IConfigDto } from '#framework/config/dto/config.dto.type';
import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  private readonly runMode: CE_RUN_MODE;

  private readonly developerEmail = 'example@example.com';

  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {
    this.runMode = this.configService.get<IConfigDto['server']['runMode']>('server.runMode', CE_RUN_MODE.LOCAL);
  }

  getTo(email: string): string {
    return this.runMode === CE_RUN_MODE.PRODUCTION ? email : this.developerEmail;
  }

  getSubjectWithRunMode(args: { subject: string }) {
    return this.runMode === CE_RUN_MODE.PRODUCTION ? args.subject : `[${this.runMode}] ${args.subject}`;
  }

  // SECTION - 회원가입 인증 메일 발송
  async userSignupVerification(
    args: Extract<
      IQueueSchema[typeof CE_TRADE_QUEUE_NAME.USER_QUEUE],
      {
        discriminator: 'signup';
        stage: typeof CE_QUEUE_STAGE.PRE;
        destination: typeof CE_QUEUE_DESTINATION.EMAIL;
      }
    >,
  ) {
    const subject = CE_MAIL_SUBJECT[CE_MAIL_TYPE.USER_SIGNUP_VERIFICATION];

    const sendOption = {
      to: this.getTo(`${args.payload.verification.contact}`),
      subject: this.getSubjectWithRunMode({ subject }),
      context: {
        verification: {
          code: args.payload.verification.code,
          // expiredAt: args.verification.expiredAt, // 만료 시점은 추후 진행하자.
        },
      },
      // TODO: 템플릿 추가 필요
      text: `회원가입 인증 메일입니다. 인증 코드는 ${args.payload.verification.code}입니다.`,
    } satisfies ISendMailOptions;

    const sended = await this.mailerService.sendMail(sendOption);

    return { sended, sendOption };
  }
  // !SECTION

  // SECTION - 비회원 비밀번호 발송
  async guestResetPasswordVerification(
    args: Extract<
      IQueueSchema[typeof CE_TRADE_QUEUE_NAME.USER_QUEUE],
      {
        discriminator: 'reset-password';
        stage: typeof CE_QUEUE_STAGE.PRE;
        destination: typeof CE_QUEUE_DESTINATION.EMAIL;
      }
    >,
  ) {
    const subject = CE_MAIL_SUBJECT[CE_MAIL_TYPE.GUEST_RESET_PASSWORD_VERIFICATION];

    const sendOption = {
      to: this.getTo(`${args.payload.verification.contact}`),
      subject: this.getSubjectWithRunMode({ subject }),
      context: {
        verification: {
          code: args.payload.verification.code,
          // expiredAt: args.verification.expiredAt, // 만료 시점은 추후 진행하자.
        },
        user: { fullName: args.payload.user.fullName },
      },
      // TODO: 템플릿 추가 필요
      text: `비밀번호 재설정 인증 메일입니다. 인증 코드는 ${args.payload.verification.code}입니다.`,
    } satisfies ISendMailOptions;

    const sended = await this.mailerService.sendMail(sendOption);

    return { sended, sendOption };
  }
  // !SECTION
}
