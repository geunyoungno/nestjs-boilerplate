import { type IMysqlConfig, type TMysqlDbName } from '#common/config/dto/mysql.dto.type';
import { type IServerDto } from '#common/config/dto/server.dto.type';

export interface IConfigDto {
  server: IServerDto;
  mysql: Record<TMysqlDbName, IMysqlConfig>;
}
