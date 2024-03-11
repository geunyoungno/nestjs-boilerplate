import { ApiOkJsend } from '#common/decorator/api-ok-jsend.decorator';
import { ResHealthDto } from '#health/dto/res-health.dto';
import { HealthService } from '#health/health.service';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('healths')
@Controller({
  path: ['/', 'healths'],
})
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @ApiOperation({ summary: '서버 health 조회 API' })
  @ApiOkJsend({
    status: 200,
    description: '서버 health 를 조회한다',
    type: { health: ResHealthDto },
  })
  @Get('/')
  check(): { health: ResHealthDto } {
    return { health: new ResHealthDto(this.healthService.check()) };
  }
}
