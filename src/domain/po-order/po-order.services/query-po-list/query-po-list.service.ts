import { Injectable } from '@nestjs/common';
import { PoHeadersService } from 'src/database/mongo/services/po_headers.service';
import { IQueryPoListCondition } from 'src/common/interfaces/database_domain.interface';
import { QueryPoListDto } from 'src/domain/po-order/dto/query-po-list.dto';
import { THAI_TIMEZONE } from 'src/common/constants';

const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone")

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class QueryPoListService {
    constructor(
        private poHeadersService: PoHeadersService,
    ){}

    async queryPoList(queryPoListDto: QueryPoListDto) {
        const condition: IQueryPoListCondition = {}

        if(queryPoListDto.PONumber) {
            condition.PONumber = queryPoListDto.PONumber
        }
        if(queryPoListDto.PRNumber) {
            condition.PRNumber = queryPoListDto.PRNumber
        }
        if(queryPoListDto.Material) {
            condition.Material = queryPoListDto.Material
        }
        if(queryPoListDto.Description) {
            condition.Description = queryPoListDto.Description
        }
        if(queryPoListDto.POStatus) {
            condition.status =  {$in: queryPoListDto.POStatus}
        }
        if(queryPoListDto.SIMGroup) {
            condition.SIMGroup = {$in: queryPoListDto.SIMGroup}
        }
        condition.PODate = {
            $gte: dayjs.tz(queryPoListDto.POstartDate, THAI_TIMEZONE).startOf('day').utc().toDate(),
            $lte: dayjs.tz(queryPoListDto.POendDate, THAI_TIMEZONE).endOf('day').utc().toDate(), 
        };
    
        const result = await this.poHeadersService.queryPoList(condition);
    
        return result; 
    }
}
