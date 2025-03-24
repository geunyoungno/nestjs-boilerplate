import { DatabaseModule } from '#common/adaptor/database/database.module';
import { MailerModule } from '#common/adaptor/mailer/mailer.module';
import { SlackModule } from '#common/adaptor/slack/slack.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule, MailerModule, SlackModule],
})
export class CommonModule {}
