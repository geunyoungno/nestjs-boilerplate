import { Module } from '@nestjs/common';
import swaggerConfiguration, { swaggerOptions } from './swagger.configuration';
import { SwaggerService } from './swagger.service';

@Module({
  providers: [
    {
      provide: SwaggerService,
      useValue: new SwaggerService(swaggerConfiguration(), swaggerOptions),
    },
  ],
})
export class SwaggerModule {}
