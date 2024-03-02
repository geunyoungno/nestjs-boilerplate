import { AppModule } from '#app.module';
import { HealthController } from '#controllers/healths/health.controller';
import { ResHealthDto } from '#dtos/healths/ResHealthDto';
import { Test, TestingModule } from '@nestjs/testing';

describe('HealthController', () => {
  let controller: HealthController;
  const now = new Date();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    jest.useFakeTimers();
    jest.setSystemTime(now);

    controller = module.get<HealthController>(HealthController);
  });

  it('should be "ResHealthDto"', () => {
    expect(controller.getHealth()).toStrictEqual(new ResHealthDto({runMode: 'local', 'timestamp': now.toISOString()}));
  });
});
