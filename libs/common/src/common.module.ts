import { DatabaseModule } from '#common/adaptor/database/database.module';
import { MailerModule } from '#common/adaptor/mailer/mailer.module';
import { QueueModule } from '#common/adaptor/queue/queue.module';
import { SlackModule } from '#common/adaptor/slack/slack.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule, MailerModule, QueueModule, SlackModule],
})
export class CommonModule {}
