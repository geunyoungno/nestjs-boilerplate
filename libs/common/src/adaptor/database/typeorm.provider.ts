import { CE_RUN_MODE } from '#common/shared/const-enum/CE_RUN_MODE';
import { type IMysqlConfig } from '#framework/config/dto/mysql.dto.type';
import { UserEntity } from '#user/entity/user.entity';
import { type Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

export const typeormMysqlNestDBSymbol = Symbol('NESTJS_DB');

export const typeOrmMysqlNestDBProvider: Provider = {
  provide: typeormMysqlNestDBSymbol,
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => {
    const mysqlConfig = configService.get<IMysqlConfig>('mysql.nestDB');

    if (mysqlConfig == null) {
      throw new Error('mysql config invalid');
    }

    const dataSource = new DataSource({
      type: 'mysql',
      host: mysqlConfig.replication.master.host,
      port: mysqlConfig.replication.master.port,
      username: process.env.NEST_DB_USERNAME,
      password: process.env.NEST_DB_PASSWORD,
      database: mysqlConfig.replication.master.database,
      entities: [UserEntity],
      // bigint 자료형 지원
      supportBigNumbers: true,
      // bigint 컬럼을 무조건 string 타입으로 전달받음
      bigNumberStrings: true,
      // timezone을 UTC로 설정
      timezone: 'Z',
      // synchronize: true,
      logging: process.env.RUN_MODE === CE_RUN_MODE.LOCAL,
    });

    return addTransactionalDataSource(dataSource).initialize();
  },
};
