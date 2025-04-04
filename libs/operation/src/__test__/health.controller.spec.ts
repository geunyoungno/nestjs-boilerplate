import { AppModule } from '#common-api/app.module';
import { CommonHealthController } from '#common-api/operation/controller/common-health.controller';
import { HealthDto } from '#common-api/operation/dto/res/health/health.dto';
import { CE_RUN_MODE } from '#common/shared/const-enum/CE_RUN_MODE';
import { Test, type TestingModule } from '@nestjs/testing';

describe('HealthController', () => {
  let controller: CommonHealthController;
  const now = new Date();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    jest.useFakeTimers();
    jest.setSystemTime(now);

    controller = module.get<CommonHealthController>(CommonHealthController);
  });

  it('should be "HealthDto"', () => {
    expect(controller.check()).toStrictEqual(
      new HealthDto({ runMode: CE_RUN_MODE.LOCAL, timestamp: now.toISOString() }),
    );
  });
});
