import { UserRepository } from '#user/repository/user.repository';
import { UserService } from '#user/service/user.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
