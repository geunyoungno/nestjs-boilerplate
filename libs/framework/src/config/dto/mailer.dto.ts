import { CE_MAILER_KEY } from '#framework/config/const-enum/CE_MAILER_KEY';
import { type IMailerConfig } from '#framework/config/dto/mailer.dto.type';
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

export class MailerDto implements Record<CE_MAILER_KEY, IMailerConfig> {
  @ValidateNested()
  @Type(() => MailerConfigDto)
  [CE_MAILER_KEY.AWS_SES]!: MailerConfigDto;
}
