import { PublicExternalUserController } from '#external-api/user/controller/external-user.controller';
import { UserModule } from '#user/user.module';
import { Module } from '@nestjs/common';

/**
 * 외부 제공용 API
 */
@Module({
  imports: [UserModule],
  controllers: [PublicExternalUserController],
})
export class ExternalModule {}
