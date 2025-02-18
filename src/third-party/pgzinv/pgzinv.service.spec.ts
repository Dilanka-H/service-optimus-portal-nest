import { Test, TestingModule } from '@nestjs/testing';
import { PgzinvService } from './pgzinv.service';

describe('PgzinvService', () => {
  let service: PgzinvService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PgzinvService],
    }).compile();

    service = module.get<PgzinvService>(PgzinvService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
