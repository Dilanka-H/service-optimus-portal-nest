import { Module } from '@nestjs/common';
import { KafkaApiController } from './kafka-api.controller';
import { KafkaApiConsumerService } from './kafka-api.services/kafka-api-consumer/kafka-consumer.service';
import { KafkaService } from 'src/jobs/kafka/kafka.service';
import { KafkaConsumerService } from 'src/jobs/kafka/kafka.consumer';
import { MongoService } from 'src/database/mongo/mongo.service';
import { MongoModule } from 'src/database/mongo/mongo.module';

@Module({
  imports: [MongoModule],
  controllers: [KafkaApiController],
  providers: [KafkaApiConsumerService, KafkaService, KafkaConsumerService, MongoService]
})
export class KafkaApiModule {}
