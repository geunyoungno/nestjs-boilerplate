import { type CE_MYSQL_KEY } from '#framework/config/const-enum/CE_MYSQL_KEY';
import { type CE_REDIS_KEY } from '#framework/config/const-enum/CE_REDIS_KEY';
import { type IMysqlConfig } from '#framework/config/dto/mysql.dto.type';
import { type IRedisConfig } from '#framework/config/dto/redis.dto.type';
import { type IServerDto } from '#framework/config/dto/server.dto.type';

export interface IConfigDto {
  server: IServerDto;
  mysql: Record<CE_MYSQL_KEY, IMysqlConfig>;
  redis: Record<CE_REDIS_KEY, IRedisConfig>;
}
