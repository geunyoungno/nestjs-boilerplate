import { type Provider } from '@nestjs/common';
import { WebClient } from '@slack/web-api';

export const slackBotSymbol = Symbol('SlackBot');

export const slackBotProvider: Provider = {
  provide: slackBotSymbol,
  useFactory: () => {
    const oauthToken = process.env.SLACK_OAUTH_TOKEN;

    return new WebClient(oauthToken);
  },
};
