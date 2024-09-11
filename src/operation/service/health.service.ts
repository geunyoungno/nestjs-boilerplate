import { CE_RUN_MODE } from '#common/shared/const-enum/CE_RUN_MODE';
import { type IConfigDto } from '#framework/config/dto/config.dto.type';
import { LoggerService } from '#framework/logger/logger.service';
import { type IHealthDomainDto } from '#operation/dto/res/health/health.dto.type';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HealthService {
  constructor(
    private loggerService: LoggerService,
    private configService: ConfigService,
  ) {}

  async check() {
    const health = {
      runMode: this.configService.get<IConfigDto['server']['runMode']>('server.runMode', CE_RUN_MODE.LOCAL),
      timestamp: new Date().toISOString(),
    } satisfies IHealthDomainDto;

    this.loggerService.info(health);

    return health;
  }
}
