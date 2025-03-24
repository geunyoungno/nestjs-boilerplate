import { type CE_MYSQL_KEY } from '#framework/config/const-enum/CE_MYSQL_KEY';
import { type IMysqlConfig } from '#framework/config/dto/mysql.dto.type';
import { type IServerDto } from '#framework/config/dto/server.dto.type';

export interface IConfigDto {
  server: IServerDto;
  mysql: Record<CE_MYSQL_KEY, IMysqlConfig>;
}
