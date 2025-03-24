import { CE_SLACK_CHANNEL } from '#common/adaptor/slack/const-enum/CE_SLACK_CHANNEL';
import { TBLock } from '#common/adaptor/slack/dto/slack.type';
import { SlackBotService } from '#common/adaptor/slack/slack-bot.service';
import { CE_RUN_MODE } from '#common/shared/const-enum/CE_RUN_MODE';
import { IConfigDto } from '#framework/config/dto/config.dto.type';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ExampleSlackService {
  private readonly runMode: CE_RUN_MODE;

  constructor(
    private readonly configService: ConfigService,
    private readonly slackBotService: SlackBotService,
  ) {
    this.runMode = this.configService.get<IConfigDto['server']['runMode']>('server.runMode', CE_RUN_MODE.LOCAL);
  }

  private getSlackChannel(args: { runMode: CE_RUN_MODE }) {
    if (args.runMode === CE_RUN_MODE.PRODUCTION) {
      return CE_SLACK_CHANNEL['EXAMPLE_PRODUCTION'];
    }

    return CE_SLACK_CHANNEL['EXAMPLE_LOCAL'];
  }

  private getHeader(): TBLock {
    return {
      type: 'header',
      text: {
        type: 'plain_text',
        text: '테스트 슬랙 헤더 :slack:',
        emoji: true,
      },
    };
  }

  private getFirst(args: { text: string }): TBLock {
    return {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*테스트 슬랙 1* : ${args.text}`,
      },
    };
  }

  private getSecond(args: { text: string }): TBLock {
    return {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*테스트 슬랙 2* : ${args.text}`,
      },
    };
  }

  private getThird(args: { text: string }): TBLock[] {
    return [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*테스트 슬랙 3* : ${args.text}`,
        },
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: '```' + args.text + '```',
        },
      },
    ];
  }

  async example(args: { text: string }) {
    // step 1. 슬랙 메시지 발송
    const blocks = [
      this.getHeader(),
      this.getFirst({ text: args.text }),
      this.getSecond({ text: args.text }),
      ...this.getThird({ text: args.text }),
    ] satisfies TBLock[];

    const sended = await this.slackBotService.send({
      channel: this.getSlackChannel({ runMode: this.runMode }),
      text: `테스트 슬랙`,
      blocks,
    });

    // step 2. 스레드 메시지 발송
    await this.slackBotService.send({
      channel: this.getSlackChannel({ runMode: this.runMode }),
      text: `테스트 슬랙 - 스레드`,
      blocks: [...this.getThird({ text: '스레드 메시지' })],
      thread_ts: sended.ts,
    });

    return sended;
  }
}
