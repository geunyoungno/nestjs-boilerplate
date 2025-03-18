import { LoggerService } from '#framework/logger/logger.service';
import type IUserEntity from '#user/entity/user.entity.type';
import { UserService } from '#user/service/user.service';
import { MailerService as NestMailerService, type ISendMailOptions } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class MailerService {
  constructor(
    private readonly mailerService: NestMailerService,
    private userService: UserService,
    private readonly logger: LoggerService,
  ) {}

  /**
   * 가입시 입증 메일 발송
   */
  @OnEvent('email.sign-up')
  async sendSignUp(args: { userUuid: IUserEntity['uuid'] }) {
    try {
      const user = await this.userService.findOrFail({
        condition: {
          uuid: args.userUuid,
        },
      });

      const sendOption = {
        to: `${user.email}`,
        subject: `${user.fullName} 환영합니다`,
        text: 'hello email world',
      } satisfies ISendMailOptions;

      const sended = await this.mailerService.sendMail(sendOption);

      this.logger.info({
        sendOption,
        sended,
        mailerService: this.mailerService,
      });
    } catch (err) {
      console.log('err', err);
    }
  }
}
