import { HealthDto } from '#common-api/operation/dto/res/health/health.dto';
import { CE_API_SECURITY } from '#common/shared/const-enum/CE_API_SECURITY';
import { CE_MASHUP } from '#common/shared/const-enum/CE_MASHUP';
import { getHost } from '#common/shared/tool/getControllerHost';
import { pathJoin } from '#common/shared/tool/pathJoin';
import { AllMethodRouteConstraints } from '#framework/decorator/controller/all-method.decorator';
import { CommonMashup } from '#framework/decorator/controller/mashup.decorator';
import { ApiOkJsend } from '#framework/decorator/dto/api-jsend.decorator';
import { HealthService } from '#operation/service/health.service';
import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';

const tags = ['health'];

@AllMethodRouteConstraints({ host: getHost(CE_MASHUP.COMMON) })
@ApiSecurity(CE_API_SECURITY.PUBLIC)
@ApiTags(...tags)
@CommonMashup()
@Controller({ host: getHost(CE_MASHUP.COMMON), path: ['/', 'health'].map((p) => pathJoin([CE_MASHUP.COMMON, p])) })
export class CommonHealthController {
  constructor(private healthService: HealthService) {}

  @ApiOperation({ summary: '서버 health 조회 API', tags })
  @ApiOkJsend({ description: '서버 health 를 조회한다', type: { health: HealthDto } })
  @Get('/')
  async check(): Promise<{ health: HealthDto }> {
    const health = await this.healthService.check();

    return { health: new HealthDto(health) };
  }
}
