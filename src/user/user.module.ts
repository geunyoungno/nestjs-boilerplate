import { TypeormModule } from '#common/database/typeorm.module';
import { userProvider } from '#user/provider/user.provider';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeormModule],
  providers: [userProvider],
  controllers: [],
})
export class UserModule {}
