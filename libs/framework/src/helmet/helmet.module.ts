import { helmetOptions } from '#framework/helmet/helmet.configuration';
import { HelmetService } from '#framework/helmet/helmet.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: HelmetService,
      useValue: new HelmetService(helmetOptions),
    },
  ],
})
export class HelmetModule {}
