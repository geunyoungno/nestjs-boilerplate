import { slackBotSymbol } from '#common/adaptor/slack/slack-bot.provider';
import { Inject, Injectable } from '@nestjs/common';
import { WebClient } from '@slack/web-api';
import { type FirstArrayElement } from 'type-fest/source/internal';

@Injectable()
export class SlackBotService {
  constructor(@Inject(slackBotSymbol) private bot: WebClient) {}

  async send(args: FirstArrayElement<Parameters<InstanceType<typeof WebClient>['chat']['postMessage']>>) {
    const sended = await this.bot.chat.postMessage(args);

    return sended;
  }
}
