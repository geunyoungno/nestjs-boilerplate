import { typeOrmMysqlNestDBProvider } from '#common/adaptor/database/typeorm.provider';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  providers: [typeOrmMysqlNestDBProvider],
  exports: [typeOrmMysqlNestDBProvider],
})
export class DatabaseModule {}
