import { IsBoolean, IsNotEmpty } from 'class-validator';

export class KafkaConsumerDto {
    @IsBoolean()
    @IsNotEmpty()
    start: boolean
}