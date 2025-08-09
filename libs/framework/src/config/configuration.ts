import { CE_RUN_MODE } from '#common/shared/const-enum/CE_RUN_MODE';
import { type IConfigDto } from '#framework/config/dto/config.dto.type';
import fs from 'fs';
import { parse } from 'jsonc-parser';
import path from 'path';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const internalConfig: IConfigDto = {} as any;
const config: Readonly<IConfigDto> = internalConfig;

export function getRunMode(undefinedRunMode?: string): CE_RUN_MODE {
  const runMode = undefinedRunMode ?? process.env.RUN_MODE ?? 'local';

  if (
    runMode !== CE_RUN_MODE.LOCAL &&
    runMode !== CE_RUN_MODE.DEVELOP &&
    runMode !== CE_RUN_MODE.QA &&
    runMode !== CE_RUN_MODE.STAGE &&
    runMode !== CE_RUN_MODE.PRODUCTION
  ) {
    throw new Error(
      `invalid run_mode: ${JSON.stringify({
        undefinedRunMode,
        RUN_MODE: process.env.RUN_MODE,
        runMode,
      })}`,
    );
  }

  return runMode;
}

export function getConfigDirname() {
  const dirname = path.join(process.cwd(), 'environment', 'config');

  return dirname;
}

function readConfigFile(runMode: CE_RUN_MODE): IConfigDto {
  const dirname = getConfigDirname();
  const filename = `config.${runMode}.json`;

  const configBuf = fs.readFileSync(path.join(dirname, filename));
  const parsed = parse(configBuf.toString()) as IConfigDto;

  Object.keys(parsed).forEach((key) => {
    internalConfig[key] = parsed[key];
  });

  return parsed;
}

/**
 * NOTE: DTO 에서 사용하는 설정 파일, 다른 곳에서 사용하지 마세요!
 */
export function getConfigInDto() {
  return config;
}

export default () => {
  const runMode = getRunMode();

  const readedConfig = readConfigFile(runMode);

  return readedConfig;
};
