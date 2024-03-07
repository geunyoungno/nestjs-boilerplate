import { nestDbProvider } from '#common/database/typeorm.provider';
import { Module } from '@nestjs/common';

@Module({
  providers: [nestDbProvider],
  exports: [nestDbProvider],
})
export class TypeormModule {}
