import { MailService } from '#common/adaptor/mailer/service/mail.service';
import isEmpty from '#common/shared/tool/isEmpty';
import { CE_MAILER_KEY } from '#framework/config/const-enum/CE_MAILER_KEY';
import { type IMailerConfig } from '#framework/config/dto/mailer.dto.type';
import { UserModule } from '#user/user.module';
import { MailerModule as NestMailerModule, type MailerOptions } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    NestMailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mailerConfig = configService.get<IMailerConfig>(`mailer.${CE_MAILER_KEY.AWS_SES}`);

        if (isEmpty(mailerConfig)) {
          throw new Error('mailer config invalid');
        }

        const transport = {
          service: mailerConfig.service,
          auth: {
            user: process.env.MAILER_AWS_SES_USERNAME ?? mailerConfig.auth.username,
            pass: process.env.MAILER_AWS_SES_PASSWORD ?? mailerConfig.auth.password,
          },
        } satisfies MailerOptions['transport'];

        const defaults = {
          from: mailerConfig.from,
        } satisfies MailerOptions['defaults'];

        // const template = {
        //   dir: path.join(__dirname, 'template', 'email'),
        //   adapter: new EjsAdapter(),
        //   options: {
        //     strict: true,
        //   },
        // } satisfies MailerOptions['template'];

        return {
          transport,
          defaults,
          // template,
        } satisfies MailerOptions;
      },
    }),
    UserModule,
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailerModule {}
