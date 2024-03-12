import { type CE_RUN_MODE } from '#common/const-enum/CE_RUN_MODE';

export interface IServerDto {
  runMode: CE_RUN_MODE;
  envId: string;
  port: number;
}
