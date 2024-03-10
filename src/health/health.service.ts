import { LoggerService } from '#common/logger/logger.service';
import { IResHealthDto } from '#health/dto/interface/IResHealthDto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  constructor(private logger: LoggerService) {}

  check() {
    const health = {
      runMode: 'local',
      timestamp: new Date().toISOString(),
    } satisfies IResHealthDto;

    this.logger.info(health);

    return health;
  }
}
