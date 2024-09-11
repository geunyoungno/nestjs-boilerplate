import { DatabaseModule } from '#common/adaptor/database/database.module';
import { MailerModule } from '#common/adaptor/mailer/mailer.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [DatabaseModule, MailerModule],
})
export class CommonModule {}
