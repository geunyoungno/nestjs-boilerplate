import { DatabaseModule } from '#common/adaptor/database/database.module';
import { MailerModule } from '#common/adaptor/mailer/mailer.module';
import { QueueModule } from '#common/adaptor/queue/queue.module';
import { SlackModule } from '#common/adaptor/slack/slack.module';
import { WebClientModule } from '#common/adaptor/web-client/web-client.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule, MailerModule, QueueModule, SlackModule, WebClientModule],
})
export class CommonModule {}
