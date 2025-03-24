import { ExampleSlackService } from '#common/adaptor/slack/example.slack.service';
import { slackBotProvider } from '#common/adaptor/slack/slack-bot.provider';
import { SlackBotService } from '#common/adaptor/slack/slack-bot.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [ExampleSlackService, slackBotProvider, SlackBotService],
  exports: [ExampleSlackService, SlackBotService],
})
export class SlackModule {}
