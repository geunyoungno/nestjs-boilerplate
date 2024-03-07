import { validate } from '#common/config/config.validatoion';
import configuration, { getConfigDirname, getRunMode } from '#common/config/configuration';
import { Module } from '@nestjs/common';
import { ConfigModule as ConfigrationModule } from '@nestjs/config';
import path from 'path';

@Module({
  imports: [
    ConfigrationModule.forRoot({
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
