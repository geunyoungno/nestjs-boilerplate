import { slackBotSymbol } from '#common/adaptor/slack/slack-bot.provider';
import { TFirstArrayElement } from '#common/shared/dto/utility.type';
import { Inject, Injectable } from '@nestjs/common';
import { WebClient } from '@slack/web-api';

@Injectable()
export class SlackBotService {
  constructor(@Inject(slackBotSymbol) private bot: WebClient) {}

  async send(args: TFirstArrayElement<Parameters<InstanceType<typeof WebClient>['chat']['postMessage']>>) {
    const sended = await this.bot.chat.postMessage(args);

    return sended;
  }
}
