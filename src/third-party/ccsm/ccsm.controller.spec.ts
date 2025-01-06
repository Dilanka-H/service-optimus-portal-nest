import { Test, TestingModule } from '@nestjs/testing';
import { CcsmController } from './ccsm.controller';

describe('CcsmController', () => {
  let controller: CcsmController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CcsmController],
    }).compile();

    controller = module.get<CcsmController>(CcsmController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
