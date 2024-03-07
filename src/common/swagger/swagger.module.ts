import swaggerConfiguration, { swaggerOptions } from '#common/swagger/swagger.configuration';
import { SwaggerService } from '#common/swagger/swagger.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [
    {
      provide: SwaggerService,
      useValue: new SwaggerService(swaggerConfiguration(), swaggerOptions),
    },
  ],
})
export class SwaggerModule {}
