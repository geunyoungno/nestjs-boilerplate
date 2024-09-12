import { ExternalUserController } from '#mashup-api/external/user/controller/external-user.controller';
import { UserModule } from '#user/user.module';
import { Module } from '@nestjs/common';

/**
 * 외부 제공용 API
 */
@Module({
  imports: [UserModule],
  controllers: [ExternalUserController],
})
export class ExternalModule {}
