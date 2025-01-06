import { Test, TestingModule } from '@nestjs/testing';
import { UpdatePoJobListService } from './update-po-job-list.service';

describe('UpdatePoJobListService', () => {
  let service: UpdatePoJobListService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdatePoJobListService],
    }).compile();

    service = module.get<UpdatePoJobListService>(UpdatePoJobListService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
