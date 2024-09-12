import { CommonModule } from '#common/common.module';
import { FrameworkModule } from '#framework/framework.module';
import { MashupModule } from '#mashup-api/mashup.module';
import { OperationModule } from '#operation/operation.module';
import { StorageModule } from '#storage/storage.module';
import { UserModule } from '#user/user.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [CommonModule, FrameworkModule, MashupModule, OperationModule, StorageModule, UserModule],
})
export class AppModule {}
