import { Injectable } from '@nestjs/common';
import { KafkaConfig, ConsumerConfig } from 'kafkajs';

@Injectable()
export class KafkaService {
  getConsumerConfig(
    brokers: string[],
    mechanism: 'plain',
    username: string,
    password: string,
    ssl: boolean,
    groupId: string,
  ): { kafkaConfig: KafkaConfig; consumerConfig: ConsumerConfig } {
    const kafkaConfig: KafkaConfig = {
      clientId: 'nestjs-kafka-client',
      brokers: brokers,
      ssl: ssl,
      sasl: username && password ? {
        mechanism: mechanism,
        username: username,
        password: password,
      } : undefined,
    };

    const consumerConfig: ConsumerConfig = {
      groupId: groupId,
      allowAutoTopicCreation: false
    };

    return { kafkaConfig, consumerConfig };
  }

  getProducerConfig(
    brokers: string[],
    mechanism: 'plain',
    username: string,
    password: string,
    ssl: boolean
  ): KafkaConfig {
    const kafkaConfig: KafkaConfig = {
      clientId: 'nestjs-kafka-client',
      brokers: brokers,
      ssl: ssl,
      sasl: username && password ? {
        mechanism: mechanism,
        username: username,
        password: password,
      } : undefined,
    };

    return kafkaConfig;
  }
}