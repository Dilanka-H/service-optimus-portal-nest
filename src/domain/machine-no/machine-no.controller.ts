import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReserveMachineNoDto } from './dto/reserve-machine-no.dto';
import { QueryMachineNoService } from './machine-no.services/query-machine-no/query-machine-no.service';
import { ReserveMachineNoService } from './machine-no.services/reserve-machine-no/reserve-machine-no.service';

@Controller('machine-no')
export class MachineNoController {
    constructor(
        private queryMachineNoService: QueryMachineNoService,
        private reserveMachineNoService: ReserveMachineNoService
    ){}

    @Get('queryMachineNo')
        async queryMachineNo() {
            return this.queryMachineNoService.queryMachineNo();
    } 

    @Post('reserveMachineNo')
        async reserveMachineNo(@Body() reserveMachineNoDto: ReserveMachineNoDto) {
            return this.reserveMachineNoService.reserveMachineNo(reserveMachineNoDto);
    } 
}
