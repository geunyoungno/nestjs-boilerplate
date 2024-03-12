import { LoggerService } from '#common/logger/logger.service';
import { type IResHealthDto } from '#nestjs-common/health/dto/res-health.dto.type';
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
    } satisfies IResHealthDto;

    this.logger.info(health);

    return health;
  }
}
