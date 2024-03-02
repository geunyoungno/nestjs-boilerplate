import { ControllerModule } from '#controllers/controller.module';
import { ProviderModule } from '#providers/provider.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [ControllerModule, ProviderModule],
})
export class AppModule {}
