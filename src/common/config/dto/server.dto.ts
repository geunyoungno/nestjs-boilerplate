import { type IServerDto } from '#common/config/dto/server.dto.type';
import { CE_RUN_MODE } from '#common/const-enum/CE_RUN_MODE';
import { IsEnum, IsNumber, IsString } from 'class-validator';

export class ServerDto implements IServerDto {
  @IsEnum(CE_RUN_MODE)
  runMode!: CE_RUN_MODE;

  @IsString()
  envId!: string;

  @IsNumber()
  port!: number;
}
