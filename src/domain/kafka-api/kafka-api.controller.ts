import { Body, Controller, Post } from '@nestjs/common';
import { KafkaConsumerDto } from 'src/domain/kafka-api/dto/kafka-consumer.dto';
import { KafkaApiConsumerService } from 'src/domain/kafka-api/kafka-api.services/kafka-api-consumer/kafka-consumer.service';

@Controller('kafka-api')
export class KafkaApiController {
    constructor(
        private kafkaApiConsumerService: KafkaApiConsumerService
    ){}
    @Post('kafkaConsumer')
    async kafkaConsumer(@Body() kafkaConsumerDto: KafkaConsumerDto) {
        return this.kafkaApiConsumerService.kafkaConsumer(kafkaConsumerDto);
    }
}
