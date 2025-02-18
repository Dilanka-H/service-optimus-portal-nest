import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import { TIMEZONE_THAI } from 'src/common/constants';
import { IPoHeaderCondition } from 'src/common/interfaces/database_domain.interface';
import { PoHeadersService } from 'src/database/mongo/services/po_headers.service';
import { QueryPoListDto } from 'src/domain/po-order/dto/query-po-list.dto';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class QueryPoListService {
  constructor(private poHeadersService: PoHeadersService) {}

  async queryPoList(queryPoListDto: QueryPoListDto) {
    const condition: IPoHeaderCondition = {};

    if (queryPoListDto.PONumber) {
      condition.PONumber = queryPoListDto.PONumber;
    }
    if (queryPoListDto.PRNumber) {
      condition.PRNumber = queryPoListDto.PRNumber;
    }
    if (queryPoListDto.Material) {
      condition.Material = queryPoListDto.Material;
    }
    if (queryPoListDto.Description) {
      condition.Description = queryPoListDto.Description;
    }
    if (queryPoListDto.excludeStatus && queryPoListDto.excludeStatus.length > 0) {
      condition.status = { $nin: queryPoListDto.excludeStatus };
    }
    if (queryPoListDto.POStatus) {
      condition.status = { $in: queryPoListDto.POStatus };
    }
    if (queryPoListDto.SIMGroup) {
      condition.SIMGroup = { $in: queryPoListDto.SIMGroup };
    }
    if (queryPoListDto.POstartDate && queryPoListDto.POendDate) {
      condition.PODate = {
        $gte: dayjs.tz(queryPoListDto.POstartDate, TIMEZONE_THAI).startOf('day').utc().toDate(),
        $lte: dayjs.tz(queryPoListDto.POendDate, TIMEZONE_THAI).endOf('day').utc().toDate(),
      };
    }
    return await this.poHeadersService.queryPoList(condition);
  }
}
