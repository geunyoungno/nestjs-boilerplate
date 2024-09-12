import { imports } from '#nestjs-boilerplate/imports';
import { PlatformModule } from '#platform-api/platform.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [...imports, PlatformModule],
})
export class AppModule {}
