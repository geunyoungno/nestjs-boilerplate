import { getDataSource } from '#common/adaptor/database/data-source/dataSource';
import { CE_MYSQL_KEY } from '#framework/config/const-enum/CE_MYSQL_KEY';
import { type IMysqlConfig } from '#framework/config/dto/mysql.dto.type';
import { LoggerService } from '#framework/logger/logger.service';
import { type Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const typeormMysqlNestDBSymbol = Symbol('NEST_DB');

export const typeOrmMysqlNestDBProvider: Provider = {
  provide: typeormMysqlNestDBSymbol,
  inject: [ConfigService, LoggerService],
  useFactory: async (configService: ConfigService, loggerService: LoggerService) => {
    const mysqlConfig = configService.get<IMysqlConfig>('mysql');
    const nestDBConfig = mysqlConfig?.[CE_MYSQL_KEY.NEST_DB];

    if (nestDBConfig == null) {
      throw new Error('mysql config invalid');
    }

    const dataSource = await getDataSource({ mysqlConfig: nestDBConfig, loggerService });
    return dataSource;
  },
};
