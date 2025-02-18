export interface IKafkaConsumerMessage {
    topic: string;
    partition: number;
    offset: string;
    value: any;
    timestamp: string
}