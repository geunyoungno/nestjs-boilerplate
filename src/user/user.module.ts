import { TypeormModule } from '#common/database/typeorm.module';
import { UserController } from '#user/controller/user.controller';
import { userProvider } from '#user/provider/user.provider';
import { UserService } from '#user/user.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeormModule],
  providers: [userProvider, UserService],
  controllers: [UserController],
})
export class UserModule {}
