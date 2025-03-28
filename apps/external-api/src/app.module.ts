import { imports } from '#common-api/imports';
import { ExternalModule } from '#external-api/external.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [...imports, ExternalModule],
})
export class AppModule {}
