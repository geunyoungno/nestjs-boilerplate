import { IResHealthDto } from '#health/dto/interface/IResHealthDto';
import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';

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

  it('should be "IResHealthDto"', () => {
    expect(service.check()).toStrictEqual({
      runMode: 'local',
      timestamp: now.toISOString(),
    } satisfies IResHealthDto);
  });
});
