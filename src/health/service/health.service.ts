import { LoggerService } from '#common/logger/logger.service';
import { type IHealthDto } from '#health/dto/res/health.dto.type';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HealthService {
  constructor(
    private logger: LoggerService,
    private config: ConfigService,
  ) {}

  check() {
    const health = {
      runMode: this.config.get('runMode') ?? 'local',
      timestamp: new Date().toISOString(),
    } satisfies IHealthDto;

    this.logger.info(health);

    return health;
  }
}
