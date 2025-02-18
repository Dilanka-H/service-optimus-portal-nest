import { Test, TestingModule } from '@nestjs/testing';
import { KafkaApiController } from './kafka-api.controller';

describe('KafkaApiController', () => {
  let controller: KafkaApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KafkaApiController],
    }).compile();

    controller = module.get<KafkaApiController>(KafkaApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
