import { imports } from '#nestjs-boilerplate/imports';
import { MashupModule } from '#nestjs-boilerplate/mashup/mashup.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [...imports, MashupModule],
})
export class AppModule {}
