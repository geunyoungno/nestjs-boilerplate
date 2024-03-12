import { type IConfigDto } from '#common/config/dto/config.dto.type';
import { UserEntity } from '#user/entity/user.entity';
import { type Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const nestDbProvider: Provider = {
  provide: 'DATA_SOURCE',
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const mysqlConfig = configService.get<IConfigDto['mysql']>('mysql');
    const nestDBConfig = mysqlConfig?.nestDB;

    if (nestDBConfig == null) {
      throw new Error('mysql config invalid');
    }

    const dataSource = new DataSource({
      type: 'mysql',
      host: nestDBConfig.replication.master.host,
      port: nestDBConfig.replication.master.port,
      username: process.env.NEST_DB_USERNAME,
      password: process.env.NEST_DB_PASSWORD,
      database: nestDBConfig.replication.master.database,
      entities: [UserEntity],
      // bigint 자료형 지원
      supportBigNumbers: true,
      // bigint 컬럼을 무조건 string 타입으로 전달받음
      bigNumberStrings: true,
      // timezone을 UTC로 설정
      timezone: 'Z',
      // synchronize: true,
    });

    return dataSource.initialize();
  },
};
