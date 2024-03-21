import { AppModule } from '#app.module';
import { HealthController } from '#health/controller/health.controller';
import { HealthDto } from '#nestjs-common/health/dto/res/health.dto';
import { Test, type TestingModule } from '@nestjs/testing';

describe('HealthController', () => {
  let controller: HealthController;
  const now = new Date();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    jest.useFakeTimers();
    jest.setSystemTime(now);

    controller = module.get<HealthController>(HealthController);
  });

  it('should be "HealthDto"', () => {
    expect(controller.check()).toStrictEqual(new HealthDto({ runMode: 'local', timestamp: now.toISOString() }));
  });
});
