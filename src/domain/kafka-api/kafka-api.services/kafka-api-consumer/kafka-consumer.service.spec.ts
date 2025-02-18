import { Test, TestingModule } from '@nestjs/testing';
import { KafkaApiConsumerService } from './kafka-consumer.service';

describe('KafkaApiConsumerService', () => {
  let service: KafkaApiConsumerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KafkaApiConsumerService],
    }).compile();

    service = module.get<KafkaApiConsumerService>(KafkaApiConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
