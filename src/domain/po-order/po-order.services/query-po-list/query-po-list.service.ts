import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import { setDateRangeConditionDate, setParams } from 'src/common/utils';
import { PoHeaderCondition } from 'src/database/mongo/repositories/po_headers/po_headers.interface';
import { PoHeadersRepository } from 'src/database/mongo/repositories/po_headers/po_headers.respository';
import { QueryPoListDto } from 'src/domain/po-order/dto/query-po-list.dto';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class QueryPoListService {
  constructor(private poHeadersRepository: PoHeadersRepository) {}

  async queryPoList(queryPoListDto: QueryPoListDto) {
    const condition: PoHeaderCondition = {};

    setParams(condition, 'PONumber', queryPoListDto.PONumber);
    setParams(condition, 'PRNumber', queryPoListDto.PRNumber);
    setParams(condition, 'status', queryPoListDto.excludeStatus, (v) => ({ $nin: v }));
    setParams(condition, 'status', queryPoListDto.POStatus, (v) => ({ $in: v }));
    setParams(condition, 'SIMGroup', queryPoListDto.SIMGroup, (v) => ({ $in: v }));
    setParams(condition, 'Material', queryPoListDto.Material);
    setParams(condition, 'Description', queryPoListDto.Description);
    setDateRangeConditionDate(condition, 'PODate', queryPoListDto.POstartDate, queryPoListDto.POendDate);

    return await this.poHeadersRepository.queryPoList(condition);
  }
}
