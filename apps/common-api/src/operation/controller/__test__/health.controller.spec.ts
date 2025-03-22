import { CommonHealthController } from '#common-api/operation/controller/common-health.controller';
import { HealthDto } from '#common-api/operation/dto/res/health/health.dto';
import { CE_RUN_MODE } from '#common/shared/const-enum/CE_RUN_MODE';
import { ClsModule } from '#framework/cls/cls.module';
import { ConfigModule } from '#framework/config/config.module';
import { LoggerModule } from '#framework/logger/logger.module';
import { OperationModule } from '#operation/operation.module';
import { HealthService } from '#operation/service/health.service';
import { Test, type TestingModule } from '@nestjs/testing';

describe('CommonHealthController', () => {
  let controller: CommonHealthController;
  const now = new Date();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [OperationModule, ConfigModule, LoggerModule, ClsModule],
      controllers: [CommonHealthController],
      providers: [HealthService],
    }).compile();

    jest.useFakeTimers();
    jest.setSystemTime(now);

    controller = module.get<CommonHealthController>(CommonHealthController);
  });

  it('should be "HealthDto"', () => {
    expect(controller.check()).toMatchObject({
      health: new HealthDto({ runMode: CE_RUN_MODE.SHORT, timestamp: now.toISOString() }),
    });
  });
});
