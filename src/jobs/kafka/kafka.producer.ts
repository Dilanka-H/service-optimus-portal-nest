// import { Injectable, OnModuleDestroy } from '@nestjs/common';
// import * as Kafka from 'node-rdkafka';
// import { KafkaService } from './kafka.service';
// import { KafkaConfiguration } from 'src/config/kafka.config';

// @Injectable()
// export class KafkaProducerService implements OnModuleDestroy {
//   private producer: Kafka.Producer;
//   private isReady = false;

//   constructor(private readonly kafkaService: KafkaService, private readonly kafkaConfig: KafkaConfiguration) {
//     const config = this.kafkaService.getProducerConfig(this.kafkaConfig.kafkaServerUri, this.kafkaConfig.kafkaMechanism, this.kafkaConfig.kafaSecurityProtocol, this.kafkaConfig.kafkaUsername, this.kafkaConfig.kafkaPassword);
//     this.producer = new Kafka.Producer(config);

//     this.producer.on('ready', () => {
//       console.log('Kafka Producer is ready');
//       this.isReady = true;
//     });

//     this.producer.on('event.error', (err) => console.error('Producer error:', err));
//     this.producer.connect();
//   }

//   async sendMessage(topic: string, message: object): Promise<void> {
//     if (!this.isReady) {
//       throw new Error('Kafka Producer is not ready yet.');
//     }

//     const messageBuffer = Buffer.from(JSON.stringify(message));

//     this.producer.produce(
//       topic,
//       null, // Partition (null for automatic partitioning)
//       messageBuffer,
//       null, // Key (optional)
//       Date.now(), // Timestamp
//     );

//     console.log(`Message sent to topic ${topic}:`, message);
//   }

//   onModuleDestroy() {
//     this.producer.disconnect();
//   }
// }
