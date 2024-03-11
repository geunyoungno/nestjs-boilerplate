import { type CE_RUN_MODE } from '#common/const-enum/CE_RUN_MODE';
import { type MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export interface IServerDto {
  runMode: CE_RUN_MODE;
  envId: string;
  port: number;
}

export interface IMysqlConfig {
  replication: NonNullable<MysqlConnectionOptions['replication']>;
}

type TMysqlDbName = 'nestDB';

export interface IConfigDto {
  server: IServerDto;
  mysql: Record<TMysqlDbName, IMysqlConfig>;
}
