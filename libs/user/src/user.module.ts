import { UserImageLinkageRepository } from '#user/repository/user-image-linkage.repository';
import { UserRepository } from '#user/repository/user.repository';
import { UserService } from '#user/service/user.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [UserImageLinkageRepository, UserRepository, UserService],
  exports: [UserService],
})
export class UserModule {}
