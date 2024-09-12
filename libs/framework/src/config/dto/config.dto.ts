import { MailerDto } from '#framework/config/dto/mailer.dto';
import { MysqlDto } from '#framework/config/dto/mysql.dto';
import { ServerDto } from '#framework/config/dto/server.dto';
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
