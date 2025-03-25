import { webClientProvider } from '#common/adaptor/web-client/web-client.provider';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [webClientProvider],
  exports: [webClientProvider],
})
export class WebClientModule {}
