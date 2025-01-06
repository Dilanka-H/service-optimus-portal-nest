import { Body, Controller, Post, Headers } from '@nestjs/common';
import { QueryPoListDto } from 'src/domain/po-order/dto/query-po-list.dto';
import { UpdatePoJobListDto } from 'src/domain/po-order/dto/update-po-job-list.dto';
import { ReservePoJobToProcessDto } from 'src/domain/po-order/dto/reserve-po-job-to-process.dto';
import { QueryPoListService } from 'src/domain/po-order/po-order.services/query-po-list/query-po-list.service';
import { UpdatePoJobListService } from 'src/domain/po-order/po-order.services/update-po-job-list/update-po-job-list.service';
import { ReservePoJobToProcessService } from 'src/domain/po-order/po-order.services/reserve-po-job-to-process/reserve-po-job-to-process.service';

@Controller('po-order')
export class PoOrderController {
    constructor(
        private queryPoListService: QueryPoListService,
        private updatePoJobListService: UpdatePoJobListService,
        private reservePoJobToProcessService: ReservePoJobToProcessService
    ){}
    @Post('queryPoList')
        async updateJobList(@Body() queryPoListDto: QueryPoListDto) {
            return this.queryPoListService.queryPoList(queryPoListDto);
    } 
    @Post('updatePoJobList')
        async updatePoJobList(@Body() updatePoJobListDto: UpdatePoJobListDto) {
            return this.updatePoJobListService.updatePoJobList(updatePoJobListDto);
    } 
    @Post('reservePoJobToProcess')
        async reservePoJobToProcess(@Headers('token-user') tokenUser: string, @Body() reservePoJobToProcessDto: ReservePoJobToProcessDto) {
            reservePoJobToProcessDto.tokenUser = tokenUser
            return this.reservePoJobToProcessService.reservePoJobToProcess(reservePoJobToProcessDto);
    } 
}
