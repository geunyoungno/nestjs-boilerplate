import { ResHealthDto } from '#dtos/healths/ResHealthDto';
import { HealthService } from '#providers/healths/health.service';
import { Controller, Get } from '@nestjs/common';

@Controller(['/', 'healths'])
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('/')
  getHealth(): ResHealthDto {
    return new ResHealthDto(this.healthService.read());
  }
}
