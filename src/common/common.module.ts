import { ClsModule } from '#common/cls/cls.module';
import { ConfigModule } from '#common/config/config.module';
import { DatabaseModule } from '#common/database/database.module';
import { EventEmitterModule } from '#common/event-emitter/event-emitter.module';
import { FilterModule } from '#common/filter/filter.module';
import { HelmetModule } from '#common/helmet/helmet.module';
import { InterceptorModule } from '#common/interceptor/interceptor.module';
import { LoggerModule } from '#common/logger/logger.module';
import { MailerModule } from '#common/mailer/mailer.module';
import { SwaggerModule } from '#common/swagger/swagger.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ClsModule,
    ConfigModule,
    DatabaseModule,
    EventEmitterModule,
    FilterModule,
    HelmetModule,
    InterceptorModule,
    LoggerModule,
    MailerModule,
    SwaggerModule,
  ],
})
export class CommonModule {}
