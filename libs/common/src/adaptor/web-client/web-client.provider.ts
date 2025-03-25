import { ConcreteWebClient, WebClient } from '#common/adaptor/web-client/client/web-client';
import { LoggerService } from '#framework/logger/logger.service';
import { type Provider } from '@nestjs/common';

export const webClientProvider: Provider = {
  provide: WebClient,
  inject: [LoggerService],
  useFactory: (loggerService: LoggerService) => {
    return new ConcreteWebClient(loggerService);
  },
};
