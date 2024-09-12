import { ConfigDto } from '#framework/config/dto/config.dto';
import { plainToClass } from 'class-transformer';
import { validateSync } from 'class-validator';

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(ConfigDto, config, { enableImplicitConversion: true });

  const errors = validateSync(validatedConfig);

  if (errors.length > 0) {
    throw new Error(['config validate error', errors.toString()].join('\n'));
  }

  return validatedConfig;
}
