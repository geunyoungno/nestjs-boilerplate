import { typeOrmMongoNestDBProvider } from '#common/database/typeorm.provider';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [typeOrmMongoNestDBProvider],
  exports: [typeOrmMongoNestDBProvider],
})
export class DatabaseModule {}
