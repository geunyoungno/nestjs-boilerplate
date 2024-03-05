import { IResHealthDto } from '#dtos/healths/interfaces/IResHealthDto';
import { WinstonService } from '#plugins/winston/winston.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  constructor(private logger: WinstonService) {}

  read() {
    const healthDto = {
      runMode: 'local',
      timestamp: new Date().toISOString(),
    } satisfies IResHealthDto;

    this.logger.info(healthDto);

    return healthDto;
  }
}
