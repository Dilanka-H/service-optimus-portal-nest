import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import { setDateRangeConditionDate, setObjectParams } from 'src/common/utils';
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

    setObjectParams(condition, 'PONumber', queryPoListDto.PONumber);
    setObjectParams(condition, 'PRNumber', queryPoListDto.PRNumber);
    setObjectParams(condition, 'status', queryPoListDto.excludeStatus, (v) => ({ $nin: v }));
    setObjectParams(condition, 'status', queryPoListDto.POStatus, (v) => ({ $in: v }));
    setObjectParams(condition, 'SIMGroup', queryPoListDto.SIMGroup, (v) => ({ $in: v }));
    setObjectParams(condition, 'Material', queryPoListDto.Material);
    setObjectParams(condition, 'Description', queryPoListDto.Description);
    setDateRangeConditionDate(condition, 'PODate', queryPoListDto.POstartDate, queryPoListDto.POendDate);

    return await this.poHeadersRepository.queryPoList(condition);
  }
}
