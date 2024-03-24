import { UserController } from '#user/controller/user.controller';
import { UserRepository } from '#user/repository/user.repository';
import { UserService } from '#user/service/user.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [UserService, UserRepository],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
