import { CorsService } from '#framework/cors/cors.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: CorsService,
      useValue: new CorsService(),
    },
  ],
})
export class CorsModule {}
