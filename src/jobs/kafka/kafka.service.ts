// import { Injectable } from '@nestjs/common';
// import { ConsumerGlobalConfig, ProducerGlobalConfig } from 'node-rdkafka';

// @Injectable()
// export class KafkaService {
//     getConsumerConfig(
//         uri: string,
//         mechanism: string,
//         protocol: 'plaintext' | 'ssl' | 'sasl_plaintext' | 'sasl_ssl',
//         username: string,
//         password: string,
//         groupId: string
//       ): ConsumerGlobalConfig {
//         return {
//           "metadata.broker.list": uri,
//           "enable.auto.commit": false,
//           "sasl.mechanism": mechanism,
//           "security.protocol": protocol,
//           "sasl.username": username,
//           "sasl.password": password,
//           "group.id": groupId,
//         };
//       }
    
//       getProducerConfig(
//         uri: string,
//         mechanism: string,
//         protocol: 'plaintext' | 'ssl' | 'sasl_plaintext' | 'sasl_ssl',
//         username: string,
//         password: string
//       ): ProducerGlobalConfig {
//         return {
//           "bootstrap.servers": uri,
//           "security.protocol": protocol,
//           "sasl.mechanisms": mechanism,
//           "sasl.username": username,
//           "sasl.password": password,
//           dr_cb: true,
//         };
//       }
// }
