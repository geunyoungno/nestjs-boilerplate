import { IServerDto } from '#common/config/dto/interface/IConfigDto';
import { CE_RUN_MODE } from '#common/const-enum/CE_RUN_MODE';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';

export class ServerDto implements IServerDto {
  @IsEnum(CE_RUN_MODE)
  runMode!: CE_RUN_MODE;

  @IsString()
  envId!: string;

  @IsNumber()
  port!: number;
}

export class ConfigDto {
  @ValidateNested()
  @Type(() => ServerDto)
  server!: ServerDto;
}
