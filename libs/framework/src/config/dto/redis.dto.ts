import { CE_REDIS_KEY } from '#framework/config/const-enum/CE_REDIS_KEY';
import { type IRedisConfig } from '#framework/config/dto/redis.dto.type';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';

class RedisDBConfigDto implements Readonly<IRedisConfig['db']> {
  @IsInt()
  cache!: number;

  @IsInt()
  queue!: number;
}

class RedisConfigDto implements IRedisConfig {
  @IsString()
  host!: string;

  @IsInt()
  port!: number;

  @ValidateNested()
  db!: RedisDBConfigDto;

  @IsInt()
  @IsOptional()
  ttl?: number;

  @IsBoolean()
  @IsOptional()
  tls?: boolean;
}

export class RedisDto implements Record<CE_REDIS_KEY, IRedisConfig> {
  @ValidateNested()
  @Type(() => RedisConfigDto)
  [CE_REDIS_KEY.NEST_REDIS]!: RedisConfigDto;
}
