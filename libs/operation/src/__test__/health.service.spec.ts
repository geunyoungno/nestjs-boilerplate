import { type IHealthBaseDto } from '#operation/dto/res/health/health.dto.type';
import { HealthService } from '#operation/service/health.service';
import { Test, type TestingModule } from '@nestjs/testing';

describe('HealthService', () => {
  let service: HealthService;
  const now = new Date();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthService],
    }).compile();

    jest.useFakeTimers();
    jest.setSystemTime(now);

    service = module.get<HealthService>(HealthService);
  });

  it('should be "IHealthDto"', () => {
    expect(service.check()).toStrictEqual({
      runMode: 'local',
      timestamp: now.toISOString(),
    } satisfies IHealthBaseDto);
  });
});
