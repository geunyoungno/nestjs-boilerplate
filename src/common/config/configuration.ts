import { IConfigDto } from '#common/config/dto/interface/IConfigDto';
import { CE_RUN_MODE } from '#common/const-enum/CE_RUN_MODE';
import fs from 'fs';
import { parse } from 'jsonc-parser';
import path from 'path';

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
  const dirname = path.join(__dirname, '../', '../', 'resource', 'config');

  return dirname;
}

function readConfigFile(runMode: CE_RUN_MODE): IConfigDto {
  const dirname = getConfigDirname();
  const filename = `config.${runMode}.json`;

  const configBuf = fs.readFileSync(path.join(dirname, filename));
  const parsed = parse(configBuf.toString()) as IConfigDto;

  return parsed;
}

export default () => {
  const runMode = getRunMode();

  const readedConfig = readConfigFile(runMode);

  return readedConfig;
};
