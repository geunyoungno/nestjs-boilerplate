import { TypeormModule } from '#common/database/typeorm.module';
import { userProviders } from '#user/user.providers';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeormModule],
  providers: [...userProviders],
  controllers: [],
})
export class UserModule {}
