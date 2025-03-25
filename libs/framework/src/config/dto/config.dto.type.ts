import { type CE_ENDPOINT_KEY } from '#framework/config/const-enum/CE_ENDPOINT_KEY';
import { type CE_MYSQL_KEY } from '#framework/config/const-enum/CE_MYSQL_KEY';
import { type CE_REDIS_KEY } from '#framework/config/const-enum/CE_REDIS_KEY';
import { type IEndpointConfig } from '#framework/config/dto/endpoint.dto.type';
import { type IMysqlConfig } from '#framework/config/dto/mysql.dto.type';
import { type IRedisConfig } from '#framework/config/dto/redis.dto.type';
import { type IServerDto } from '#framework/config/dto/server.dto.type';

export interface IConfigDto {
  server: IServerDto;
  endpoint: Record<CE_ENDPOINT_KEY, IEndpointConfig>;
  mysql: Record<CE_MYSQL_KEY, IMysqlConfig>;
  redis: Record<CE_REDIS_KEY, IRedisConfig>;
}
