import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import { setDateRangeConditionDate, setDateRangeConditionString, setObjectParams } from 'src/common/utils';
import { PoHeaderCondition } from 'src/database/mongo/repositories/po_headers/po_headers.interface';
import { PoJobCondition } from 'src/database/mongo/repositories/po_jobs/po_jobs.interface';
import { PoJobsRepository } from 'src/database/mongo/repositories/po_jobs/po_jobs.respository';
import { QueryPoJobListDto } from 'src/domain/po-order/dto/query-po-job-list.dto';
import { SerialListInfo } from './query-po-job-list.interface';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class QueryPoJobListService {
  constructor(private poJobsService: PoJobsRepository) {}

  async queryPoJobList(queryPoJobListDto: QueryPoJobListDto) {
    const conditionPoJob: PoJobCondition = {};
    const conditionPoHeader: PoHeaderCondition = {};

    setObjectParams(conditionPoJob, 'PONumber', queryPoJobListDto.PONumber);
    setObjectParams(conditionPoJob, 'jobId', queryPoJobListDto.jobId);
    setObjectParams(conditionPoJob, 'jobStatus', queryPoJobListDto.excludeStatus, (v) => ({
      $nin: v,
    }));
    setObjectParams(conditionPoJob, 'jobStatus', queryPoJobListDto.jobStatus, (v) => ({ $in: v }));
    setObjectParams(conditionPoJob, 'inspectInfo.inspectStatus1', queryPoJobListDto.Inspect1?.Inspect1status);
    setObjectParams(conditionPoJob, 'inspectInfo.inspectStatus2', queryPoJobListDto.Inspect2?.Inspect2status);
    setDateRangeConditionString(conditionPoJob, 'inspectInfo.inspectDate1', queryPoJobListDto.Inspect1?.Inspect1startDate, queryPoJobListDto.Inspect1?.Inspect1startDate);
    setDateRangeConditionString(conditionPoJob, 'inspectInfo.inspectDate2', queryPoJobListDto.Inspect2?.Inspect2startDate, queryPoJobListDto.Inspect2?.Inspect2endDate);
    setDateRangeConditionString(conditionPoJob, 'GIGRInfo.GIGRDate', queryPoJobListDto.GIGR?.GIGRstartDate, queryPoJobListDto.GIGR?.GIGRendDate);

    setObjectParams(conditionPoHeader, 'PRNumber', queryPoJobListDto.PRNumber);
    setObjectParams(conditionPoHeader, 'status', queryPoJobListDto.POStatus);
    setObjectParams(conditionPoHeader, 'SalesOrder', queryPoJobListDto.SalesOrder);
    setObjectParams(conditionPoHeader, 'SIMGroup', queryPoJobListDto.SIMGroup, (v) => ({ $in: v }));
    setObjectParams(conditionPoHeader, 'Material', queryPoJobListDto.material);
    setObjectParams(conditionPoHeader, 'Description', queryPoJobListDto.description);
    setDateRangeConditionDate(conditionPoHeader, 'PODate', queryPoJobListDto.POstartDate, queryPoJobListDto.POendDate);

    const result = await this.poJobsService.queryPoJobList(conditionPoJob, conditionPoHeader, queryPoJobListDto.searchIns, queryPoJobListDto.flagPrintPO);
    if (queryPoJobListDto.flagPrintPO && result && result.length > 0) {
      const maxQuantity = 100;
      result.forEach((res, index) => {
        if (res.serialList?.length) {
          const serialList: SerialListInfo[] = [];
          for (let i = 0; i < res.serialList.length; i += maxQuantity) {
            serialList.push({
              serialFrom: res.serialList[i],
              serialTo: res.serialList[Math.min(i + maxQuantity - 1, res.serialList.length - 1)],
              serialQty: String(Math.min(maxQuantity, res.serialList.length - i)),
            });
          }
          result[index].serialList = serialList;
        }
      });
    }
    return result;
  }
}
