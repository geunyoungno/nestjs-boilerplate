import { CE_MYSQL_KEY } from '#framework/config/const-enum/CE_MYSQL_KEY';
import { type IMysqlConfig } from '#framework/config/dto/mysql.dto.type';
import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { type MysqlConnectionCredentialsOptions } from 'typeorm/driver/mysql/MysqlConnectionCredentialsOptions';

class MysqlConnectionOption implements MysqlConnectionCredentialsOptions {
  @IsString()
  host!: string;

  @IsNumber()
  port!: number;

  @IsString()
  database!: string;

  @IsString()
  username!: string;

  @IsString()
  password!: string;
}

class MysqlReplicationDto {
  @ValidateNested()
  @Type(() => MysqlConnectionOption)
  master!: MysqlConnectionOption;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => MysqlConnectionOption)
  slaves!: MysqlConnectionOption[];
}

class MysqlConfigDto implements IMysqlConfig {
  @ValidateNested()
  @Type(() => MysqlReplicationDto)
  replication!: MysqlReplicationDto;
}

export class MysqlDto implements Record<CE_MYSQL_KEY, IMysqlConfig> {
  @ValidateNested()
  @Type(() => MysqlConfigDto)
  [CE_MYSQL_KEY.NEST_DB]!: MysqlConfigDto;
}
