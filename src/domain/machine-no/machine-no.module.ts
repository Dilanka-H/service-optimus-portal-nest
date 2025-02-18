import { Module } from '@nestjs/common';
import { MongoModule } from 'src/database/mongo/mongo.module';
import { MachineNoController } from './machine-no.controller';
import { QueryMachineNoService } from './machine-no.services/query-machine-no/query-machine-no.service';
import { ReserveMachineNoService } from './machine-no.services/reserve-machine-no/reserve-machine-no.service';

@Module({
    imports: [MongoModule],
    providers: [QueryMachineNoService, ReserveMachineNoService],
    controllers: [MachineNoController]
})
export class MachineNoModule {}
