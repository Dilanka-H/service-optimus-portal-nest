import { Test, TestingModule } from '@nestjs/testing';
import { MasterCustomersRepository } from './mastercustomers.repository';

describe('MasterCustomersService', () => {
  let service: MasterCustomersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MasterCustomersRepository],
    }).compile();

    service = module.get<MasterCustomersRepository>(MasterCustomersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
