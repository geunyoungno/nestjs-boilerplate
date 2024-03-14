import { MailerDto } from '#common/config/dto/mailer.dto';
import { MysqlDto } from '#common/config/dto/mysql.dto';
import { ServerDto } from '#common/config/dto/server.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class ConfigDto {
  @ValidateNested()
  @Type(() => ServerDto)
  server!: ServerDto;

  @ValidateNested()
  @Type(() => MysqlDto)
  mysql!: MysqlDto;

  @ValidateNested()
  @Type(() => MailerDto)
  mailer!: MailerDto;
}
