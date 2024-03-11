import { nestDbProvider } from '#common/database/typeorm.provider';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [nestDbProvider],
  exports: [nestDbProvider],
})
export class DatabaseModule {}
