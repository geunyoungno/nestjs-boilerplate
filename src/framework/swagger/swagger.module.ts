import swaggerConfiguration, { swaggerCustomOptions } from '#framework/swagger/swagger.configuration';
import { SwaggerService } from '#framework/swagger/swagger.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: SwaggerService,
      useValue: new SwaggerService(swaggerConfiguration(), swaggerCustomOptions),
    },
  ],
})
export class SwaggerModule {}
