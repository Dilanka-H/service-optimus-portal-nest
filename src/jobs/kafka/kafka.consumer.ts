// import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
// import * as Kafka from 'node-rdkafka';
// import { KafkaService } from './kafka.service';
// import { KafkaConfiguration } from 'src/config/kafka.config';

// @Injectable()
// export class KafkaConsumerService implements OnModuleInit, OnModuleDestroy {
//   private consumer: Kafka.KafkaConsumer;

//   constructor(
//     private readonly kafkaService: KafkaService,
//     private readonly kafkaConfig: KafkaConfiguration
//   ) {}

//   onModuleInit() {
//     const config = this.kafkaService.getConsumerConfig(this.kafkaConfig.kafkaServerUri, this.kafkaConfig.kafkaMechanism, this.kafkaConfig.kafaSecurityProtocol, this.kafkaConfig.kafkaUsername, this.kafkaConfig.kafkaPassword, this.kafkaConfig.kafkaGroupId);
//     this.consumer = new Kafka.KafkaConsumer(config, { "auto.offset.reset": "earliest" });

//     this.consumer.on('ready', () => {
//       console.log('Kafka Consumer is ready');
//       this.consumer.subscribe(['sap.BusinessPartner.Replicate.Out']);
//       this.consumer.consume();
//     });

//     this.consumer.on('data', (message) => {
//       console.log('Received message:', {
//         topic: message.topic,
//         partition: message.partition,
//         offset: message.offset,
//         value: message.value.toString(),
//       });
//     });

//     this.consumer.on('event.error', (err) => console.error('Consumer error:', err));
//     this.consumer.connect();
//   }

//   onModuleDestroy() {
//     this.consumer.disconnect();
//   }
// }
