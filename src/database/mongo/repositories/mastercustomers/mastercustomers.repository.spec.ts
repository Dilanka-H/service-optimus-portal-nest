import { Test, TestingModule } from '@nestjs/testing';
import { MastercustomersRepository } from './mastercustomers.repository';

describe('MastercustomersService', () => {
  let service: MastercustomersRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MastercustomersRepository],
    }).compile();

    service = module.get<MastercustomersRepository>(MastercustomersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
