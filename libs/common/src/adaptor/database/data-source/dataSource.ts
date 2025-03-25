import { TokenEntity } from '#auth/entity/token.entity';
import TypeormLogger from '#common/adaptor/database/logger/typeorm-logger';
import { isNotEmpty } from '#common/shared/tool/isEmpty';
import { CE_MYSQL_KEY } from '#framework/config/const-enum/CE_MYSQL_KEY';
import { type IMysqlConfig } from '#framework/config/dto/mysql.dto.type';
import { type LoggerService } from '#framework/logger/logger.service';
import { ImageEntity } from '#storage/entity/image.entity';
import { UserImageLinkageEntity } from '#user/entity/user-image-linkage.entity';
import { UserEntity } from '#user/entity/user.entity';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dataSourceMap: Record<CE_MYSQL_KEY, DataSource> = {} as any;

export function getNestDBDataSource(args?: { mysqlConfig?: IMysqlConfig; loggerService?: LoggerService }) {
  const mysqlConfig = args?.mysqlConfig;
  const loggerService = args?.loggerService;

  const dataSource = new DataSource({
    name: CE_MYSQL_KEY.NEST_DB,
    type: 'mysql',
    host: mysqlConfig?.replication.master.host ?? 'localhost',
    port: mysqlConfig?.replication.master.port ?? 3306,
    username: process.env.NEST_DB_USERNAME ?? 'root',
    password: process.env.NEST_DB_PASSWORD ?? 'testadmin',
    database: mysqlConfig?.replication.master.database ?? CE_MYSQL_KEY.NEST_DB,
    charset: 'utf8mb4_unicode_ci',
    extra: { charset: 'utf8mb4_unicode_ci' },
    entities: [
      // SECTION - auth
      TokenEntity,
      // !SECTION

      // SECTION - storage
      ImageEntity,
      // !SECTION

      // SECTION - user
      UserEntity,
      UserImageLinkageEntity,
      // !SECTION
    ],
    // bigint 자료형 지원
    supportBigNumbers: true,
    // bigint 컬럼을 무조건 string 타입으로 전달받음
    bigNumberStrings: true,
    // timezone을 UTC로 설정
    timezone: 'Z',
    // synchronize: true,
    logger: loggerService == null ? undefined : new TypeormLogger(loggerService),
  });

  return dataSource;
}

export const getDataSource = async (args?: { mysqlConfig?: IMysqlConfig; loggerService?: LoggerService }) => {
  if (isNotEmpty(dataSourceMap[CE_MYSQL_KEY.NEST_DB]) && dataSourceMap[CE_MYSQL_KEY.NEST_DB] instanceof DataSource) {
    return dataSourceMap[CE_MYSQL_KEY.NEST_DB];
  }

  const dataSource = getNestDBDataSource(args);

  dataSourceMap[CE_MYSQL_KEY.NEST_DB] = dataSource;

  return await addTransactionalDataSource(dataSource).initialize();
};
