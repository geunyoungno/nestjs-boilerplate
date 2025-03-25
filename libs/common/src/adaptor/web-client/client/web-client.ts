import { FetchClient } from '#common/adaptor/web-client/client/fetch-client';
import { type IWebClient } from '#common/adaptor/web-client/client/web-client.type';
import { type LoggerService } from '#framework/logger/logger.service';

export abstract class WebClient {
  constructor(protected readonly loggerService: LoggerService) {}

  abstract builder(url: string): IWebClient;

  get logger(): LoggerService {
    return this.loggerService;
  }
}

export class ConcreteWebClient extends WebClient {
  constructor(loggerService: LoggerService) {
    super(loggerService);
  }

  override builder(url: string): IWebClient {
    return new FetchClient({ url }).setLogger(this.loggerService);
  }
}
