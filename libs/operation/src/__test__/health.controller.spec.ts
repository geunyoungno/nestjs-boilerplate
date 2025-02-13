import { CommonHealthController } from '#mashup/common/operation/controller/common-health.controller';
import { HealthDto } from '#mashup/common/operation/dto/res/health/health.dto';
import { AppModule } from '#nestjs-boilerplate/app.module';
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
    expect(controller.check()).toStrictEqual(new HealthDto({ runMode: 'local', timestamp: now.toISOString() }));
  });
});
