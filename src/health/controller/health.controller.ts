import { ApiOkJsend } from '#framework/decorator/api-jsend.decorator';
import { HealthDto } from '#health/dto/res/health.dto';
import { HealthService } from '#health/service/health.service';
import { Controller, Get } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('healths')
@Controller({
  path: ['/', 'healths'],
})
export class HealthController {
  constructor(
    private readonly healthService: HealthService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  @ApiOperation({ summary: '서버 health 조회 API' })
  @ApiOkJsend({
    status: 200,
    description: '서버 health 를 조회한다',
    type: { health: HealthDto },
  })
  @Get('/')
  async check(): Promise<{ health: HealthDto }> {
    this.eventEmitter.emit('email.user.sigin-up.verifiy', {
      userUuid: '7abe109a-a336-48d4-8c02-d47c8e620095',
    });
    // this.eventEmitter.emit()
    // this.eventEmitter.

    // const sended = await this.mailerService.sendMail({
    //   from: 'geunyoung.no@seller-note.com',
    //   to: 'geunyoung.no@seller-note.com',
    //   subject: 'mail test email',
    //   text: 'hello email workd',
    // });

    // console.log({
    //   sended,
    // });

    return { health: new HealthDto(this.healthService.check()) };
  }
}
