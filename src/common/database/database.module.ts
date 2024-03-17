import { typeOrmMysqlNestDBProvider } from '#common/database/typeorm.provider';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [typeOrmMysqlNestDBProvider],
  exports: [typeOrmMysqlNestDBProvider],
})
export class DatabaseModule {}
