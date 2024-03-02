import { IResHealthDto } from '#dtos/healths/interfaces/IResHealthDto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HealthService {
  read() {
    return {
      runMode: 'local',
      timestamp: new Date().toISOString(),
    } satisfies IResHealthDto;
  }
}
