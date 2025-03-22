import { imports } from '#common-api/imports';
import { MashupModule } from '#common-api/mashup/mashup.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [...imports, MashupModule],
})
export class AppModule {}
