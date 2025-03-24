import { type MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

export interface IMysqlConfig {
  replication: NonNullable<MysqlConnectionOptions['replication']>;
}
