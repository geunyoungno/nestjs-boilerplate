import { nestDBProvider } from '#common/database/typeorm.provider';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [nestDBProvider],
  exports: [nestDBProvider],
})
export class DatabaseModule {}
