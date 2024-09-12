import { validate } from '#framework/config/config.validation';
import configuration, { getConfigDirname, getRunMode } from '#framework/config/configuration';
import { Module } from '@nestjs/common';
import { ConfigModule as ConfigurationModule } from '@nestjs/config';
import path from 'path';

@Module({
  imports: [
    ConfigurationModule.forRoot({
      isGlobal: true,
      // config env 파일
      envFilePath: [path.join(getConfigDirname(), `config.${getRunMode()}.env`)],
      // config json 파일
      load: [configuration],
      validate,
    }),
  ],
})
export class ConfigModule {}
