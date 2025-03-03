import { Test, TestingModule } from '@nestjs/testing';
import { PoHeadersRepository } from './po_headers.respository';

describe('PoHeadersService', () => {
  let service: PoHeadersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PoHeadersRepository],
    }).compile();

    service = module.get<PoHeadersRepository>(PoHeadersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
