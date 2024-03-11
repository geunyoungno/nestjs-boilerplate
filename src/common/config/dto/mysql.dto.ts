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

class MysqlConfigDto {
  @ValidateNested()
  @Type(() => MysqlReplicationDto)
  replication!: MysqlReplicationDto;
}

export class MysqlDto {
  @ValidateNested()
  @Type(() => MysqlConfigDto)
  nestDB!: MysqlConfigDto;
}
