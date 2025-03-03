import { Test, TestingModule } from '@nestjs/testing';
import { PoJobsRepository } from './po_jobs.respository';

describe('PoJobsRepository', () => {
  let service: PoJobsRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoJobsRepository],
    }).compile();

    service = module.get<PoJobsRepository>(PoJobsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
