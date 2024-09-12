import { CE_RUN_MODE } from '#common/shared/const-enum/CE_RUN_MODE';
import { type IServerDto } from '#framework/config/dto/server.dto.type';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class ServerDto implements IServerDto {
  @IsEnum(CE_RUN_MODE)
  runMode!: CE_RUN_MODE;

  @IsString()
  envId!: string;

  @IsNumber()
  port!: number;
}
