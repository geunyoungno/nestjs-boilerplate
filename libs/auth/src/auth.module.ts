import { TokenRepository } from '#auth/repository/token.repostiory';
import { Module } from '@nestjs/common';

@Module({
  providers: [TokenRepository],
})
export class AuthModule {}
