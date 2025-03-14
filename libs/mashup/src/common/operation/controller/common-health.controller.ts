import { CE_MASHUP } from '#common/shared/const-enum/CE_MASHUP';
import { getHost } from '#common/shared/tool/getControllerHost';
import { AllMethodRouteConstraints } from '#framework/decorator/controller/all-method.decorator';
import { ApiOkJsend } from '#framework/decorator/dto/api-jsend.decorator';
import { HealthDto } from '#mashup/common/operation/dto/res/health/health.dto';
import { HealthService } from '#operation/service/health.service';
import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@AllMethodRouteConstraints({ host: getHost(CE_MASHUP.COMMON) })
@Controller({
  path: ['/', 'health'],
})
export class CommonHealthController {
  constructor(private readonly healthService: HealthService) {}

  @ApiOperation({ summary: '서버 health 조회 API' })
  @ApiOkJsend({ status: HttpStatus.OK, description: '서버 health 를 조회한다', type: { health: HealthDto } })
  @Get('/')
  async check(): Promise<{ health: HealthDto }> {
    const health = await this.healthService.check();

    return { health: new HealthDto(health) };
  }
}
