import { helmetOptions } from '#common/helmet/helmet.configuration';
import { HelmetService } from '#common/helmet/helmet.service';
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
