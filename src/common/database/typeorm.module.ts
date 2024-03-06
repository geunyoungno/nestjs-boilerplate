import { typeormProvider } from '#common/database/typeorm.provider';
import { Module } from '@nestjs/common';

@Module({
  providers: [...typeormProvider],
  exports: [...typeormProvider],
})
export class TypeormModule {}
