import { FileController } from '#storage/controller/file.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [FileController],
})
export class StorageModule {}
