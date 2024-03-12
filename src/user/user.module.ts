import { UserController } from '#user/controller/user.controller';
import { userProvider } from '#user/repository/user.provider';
import { UserRepository } from '#user/repository/user.repository';
import { UserService } from '#user/service/user.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [userProvider, UserService, UserRepository],
  controllers: [UserController],
})
export class UserModule {}
