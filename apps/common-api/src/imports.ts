import { CommonModule } from '#common/common.module';
import { FrameworkModule } from '#framework/framework.module';
import { OperationModule } from '#operation/operation.module';
import { StorageModule } from '#storage/storage.module';
import { UserModule } from '#user/user.module';
import { type ModuleMetadata } from '@nestjs/common';

export const imports: NonNullable<ModuleMetadata['imports']> = [
  CommonModule,
  FrameworkModule,
  OperationModule,
  StorageModule,
  UserModule,
];
