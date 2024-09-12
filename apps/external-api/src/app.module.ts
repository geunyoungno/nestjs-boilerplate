import { ExternalModule } from '#external-api/external.module';
import { imports } from '#nestjs-boilerplate/imports';
import { Module } from '@nestjs/common';

@Module({
  imports: [...imports, ExternalModule],
})
export class AppModule {}
