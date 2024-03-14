import { type IMailerConfig } from '#common/config/dto/mailer.dto.type';
import { MailerService } from '#common/mailer/mailer.service';
import { UserModule } from '#user/user.module';
import { MailerModule as NestMailerModule, type MailerOptions } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    NestMailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mailerConfig = configService.get<IMailerConfig>(`mailer.gmail`);

        if (mailerConfig == null) {
          throw new Error('mailer config invalid');
        }

        const transport = {
          service: mailerConfig.service,
          auth: {
            user: process.env.MAILER_GMAIL_USERNAME ?? mailerConfig.auth.username,
            pass: process.env.MAILER_GMAIL_PASSWORD ?? mailerConfig.auth.password,
          },
        } satisfies MailerOptions['transport'];

        const defaults = {
          from: mailerConfig.from,
        } satisfies MailerOptions['defaults'];

        return {
          transport,
          defaults,
        } satisfies MailerOptions;
      },
    }),
    UserModule,
  ],
  providers: [MailerService],
})
export class MailerModule {}
