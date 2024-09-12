import { EventEmitter } from '#framework/event-emitter/event-emitter';
import { Global, Module } from '@nestjs/common';
import { EventEmitterModule as NestEventEmitterModule } from '@nestjs/event-emitter';

@Global()
@Module({
  imports: [NestEventEmitterModule.forRoot()],
  providers: [EventEmitter],
  exports: [EventEmitter],
})
export class EventEmitterModule {}
