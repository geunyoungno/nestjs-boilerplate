import { IConfigDto } from '#common/config/dto/interface/IConfigDto';
import { UserEntity } from '#user/entity/user.entity';
import { Provider } from '@nestjs/common';
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
      // synchronize: true,
    });

    return dataSource.initialize();
  },
};
