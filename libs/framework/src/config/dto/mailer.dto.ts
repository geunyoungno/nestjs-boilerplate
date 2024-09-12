import { type IMailerConfig, type TMailerName } from '#framework/config/dto/mailer.dto.type';
import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';

class MailerAuthDto {
  @IsString()
  username!: string;

  @IsString()
  password!: string;
}

class MailerConfigDto implements IMailerConfig {
  @IsString()
  service!: string;

  @ValidateNested()
  @Type(() => MailerAuthDto)
  auth!: MailerAuthDto;

  @IsString()
  from!: string;
}

export class MailerDto implements Record<TMailerName, IMailerConfig> {
  @ValidateNested()
  @Type(() => MailerConfigDto)
  gmail!: MailerConfigDto;
}
