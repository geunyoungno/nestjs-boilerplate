import { ControllerModule } from '#controllers/controller.module';
import { PluginModule } from '#plugins/plugin.module';
import { ProviderModule } from '#providers/provider.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    //
    ControllerModule,
    PluginModule,
    ProviderModule,
  ],
})
export class AppModule {}
