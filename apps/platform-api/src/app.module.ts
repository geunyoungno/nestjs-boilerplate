import { imports } from '#common-api/imports';
import { PlatformModule } from '#platform-api/platform.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [...imports, PlatformModule],
})
export class AppModule {}
