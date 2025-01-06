import { Test, TestingModule } from '@nestjs/testing';
import { ReservePoJobToProcessService } from './reserve-po-job-to-process.service';

describe('ReservePoJobToProcessService', () => {
  let service: ReservePoJobToProcessService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservePoJobToProcessService],
    }).compile();

    service = module.get<ReservePoJobToProcessService>(ReservePoJobToProcessService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
