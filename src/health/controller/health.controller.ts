import { ResHealthDto } from '#health/dto/res-health.dto';
import { HealthService } from '#health/health.service';
import { Controller, Get } from '@nestjs/common';

@Controller(['/', 'healths'])
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('/')
  getHealth(): ResHealthDto {
    return new ResHealthDto(this.healthService.check());
  }
}
