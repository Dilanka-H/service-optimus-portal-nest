import { Body, Controller, Headers, Post } from '@nestjs/common';
import { QueryPoListDto } from 'src/domain/po-order/dto/query-po-list.dto';
import { ReservePoJobToProcessDto } from 'src/domain/po-order/dto/reserve-po-job-to-process.dto';
import { UpdatePoJobListDto } from 'src/domain/po-order/dto/update-po-job-list.dto';
import { QueryPoListService } from 'src/domain/po-order/po-order.services/query-po-list/query-po-list.service';
import { ReservePoJobToProcessService } from 'src/domain/po-order/po-order.services/reserve-po-job-to-process/reserve-po-job-to-process.service';
import { UpdatePoJobListService } from 'src/domain/po-order/po-order.services/update-po-job-list/update-po-job-list.service';
import { QueryPoJobListDto } from './dto/query-po-job-list.dto';
import { QueryPoJobListService } from './po-order.services/query-po-job-list/query-po-job-list.service';

@Controller('po-order')
export class PoOrderController {
  constructor(
    private queryPoListService: QueryPoListService,
    private queryPoJobListService: QueryPoJobListService,
    private updatePoJobListService: UpdatePoJobListService,
    private reservePoJobToProcessService: ReservePoJobToProcessService,
  ) {}
  @Post('queryPOList')
  async queryPoList(@Body() queryPoListDto: QueryPoListDto) {
    return this.queryPoListService.queryPoList(queryPoListDto);
  }
  @Post('queryPOJobList')
  async queryPoJobList(@Body() queryPoJobListDto: QueryPoJobListDto) {
    return this.queryPoJobListService.queryPoJobList(queryPoJobListDto);
  }
  @Post('updatePOJobList')
  async updatePoJobList(@Headers('token-user') tokenUser: string, @Body() updatePoJobListDto: UpdatePoJobListDto) {
    return this.updatePoJobListService.updatePoJobList(updatePoJobListDto);
  }
  @Post('reservePOJobToProcess')
  async reservePoJobToProcess(@Headers('token-user') tokenUser: string, @Body() reservePoJobToProcessDto: ReservePoJobToProcessDto) {
    reservePoJobToProcessDto.tokenUser = tokenUser;
    return this.reservePoJobToProcessService.reservePoJobToProcess(reservePoJobToProcessDto);
  }
}
