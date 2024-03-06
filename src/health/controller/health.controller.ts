import { ResHealthDto } from '#health/dto/res-health.dto';
import { HealthService } from '#health/health.service';
import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller(['/', 'healths'])
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @ApiOperation({ summary: '서버 health 조회 API' })
  @ApiOkResponse({
    status: 200,
    description: '서버 health 를 조회한다',
    type: ResHealthDto,
  })
  @Get('/')
  getHealth(): ResHealthDto {
    return new ResHealthDto(this.healthService.check());
  }
}
