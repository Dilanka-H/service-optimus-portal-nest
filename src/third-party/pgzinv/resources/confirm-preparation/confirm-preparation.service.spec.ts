import { Test, TestingModule } from '@nestjs/testing';
import { ConfirmPreparationService } from './confirm-preparation.service';

describe('ConfirmPreparationService', () => {
  let service: ConfirmPreparationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConfirmPreparationService],
    }).compile();

    service = module.get<ConfirmPreparationService>(ConfirmPreparationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
