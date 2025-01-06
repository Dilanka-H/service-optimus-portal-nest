import { Test, TestingModule } from '@nestjs/testing';
import { CcsmService } from './ccsm.service';

describe('CcsmService', () => {
  let service: CcsmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CcsmService],
    }).compile();

    service = module.get<CcsmService>(CcsmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
