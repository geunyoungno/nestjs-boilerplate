import { type IMysqlConfig, type TMysqlDbName } from '#framework/config/dto/mysql.dto.type';
import { type IServerDto } from '#framework/config/dto/server.dto.type';

export interface IConfigDto {
  server: IServerDto;
  mysql: Record<TMysqlDbName, IMysqlConfig>;
}
