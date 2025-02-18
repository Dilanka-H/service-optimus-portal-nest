import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Consumer } from 'kafkajs';
import { KafkaService } from './kafka.service';
import { KafkaConfiguration } from 'src/config/kafka.config';
import { IKafkaConsumerMessage } from './interfaces';

@Injectable()
export class KafkaConsumerService implements OnModuleDestroy {
    private consumers: Map<string, Consumer> = new Map();

  constructor(
    private readonly kafkaService: KafkaService,
  ) {}

  async createConsumer(config: KafkaConfiguration, topics: string[], onMessage: (message: IKafkaConsumerMessage) => void): Promise<string> {
    try {
      if (this.consumers.get(config.kafkaGroupId)) {
        return "Consumer already running"
      }
      const { kafkaConfig, consumerConfig } = this.kafkaService.getConsumerConfig([config.kafkaServerUri], config.kafkaMechanism, config.kafkaUsername, config.kafkaPassword, config.kafkaSSL, config.kafkaGroupId);
      const kafka = new Kafka(kafkaConfig);
      const consumer = kafka.consumer(consumerConfig);
      await consumer.connect();
      console.log(`Kafka Consumer connected with groupId: ${config.kafkaGroupId}`);
  
      for (const topic of topics) {
        await consumer.subscribe({ topic, fromBeginning: true });
        console.log(`Subscribed to topic: ${topic}`);
      }
  
      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          // console.log(`Message received from topic ${topic}:`, {
          //   partition,
          //   offset: message.offset,
          //   value: message.value?.toString(),
          // });
          onMessage({ topic, partition, offset: message.offset, value: message.value?.toString(), timestamp: message.timestamp });
        },
      });
  
      this.consumers.set(config.kafkaGroupId, consumer);
    } catch(error) {
      return `Error: Unable to start consumer. Reason: ${error.message}`
    }
    
    return "Started";

  }

  async disconnectConsumer(groupId: string): Promise<string> {
    const consumer = this.consumers.get(groupId);
    if (consumer) {
      await consumer.disconnect();
      this.consumers.delete(groupId);
      console.log(`Consumer with groupId ${groupId} disconnected.`);
      return "Consumer disconnected"
    } else {
      console.log(`No consumer found with groupId: ${groupId}`);
      return "No consumer found"
    }
  }

  async disconnectAllConsumers(): Promise<void> {
    for (const [groupId, consumer] of this.consumers.entries()) {
      await consumer.disconnect();
      console.log(`Consumer with groupId ${groupId} disconnected.`);
    }
    this.consumers.clear();
  }

  onModuleDestroy() {
    this.disconnectAllConsumers();
  }
}
