import { Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import { setDateRangeConditionDate, setDateRangeConditionString, setParams } from 'src/common/utils';
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

    setParams(conditionPoJob, 'PONumber', queryPoJobListDto.PONumber);
    setParams(conditionPoJob, 'jobId', queryPoJobListDto.jobId);
    setParams(conditionPoJob, 'jobStatus', queryPoJobListDto.excludeStatus, (v) => ({ $nin: v }));
    setParams(conditionPoJob, 'jobStatus', queryPoJobListDto.jobStatus, (v) => ({ $in: v }));
    setParams(conditionPoJob, 'inspectInfo.inspectStatus1', queryPoJobListDto.Inspect1?.Inspect1status);
    setParams(conditionPoJob, 'inspectInfo.inspectStatus2', queryPoJobListDto.Inspect2?.Inspect2status);
    setDateRangeConditionString(conditionPoJob, 'inspectInfo.inspectDate1', queryPoJobListDto.Inspect1?.Inspect1startDate, queryPoJobListDto.Inspect1?.Inspect1endDate);
    setDateRangeConditionString(conditionPoJob, 'inspectInfo.inspectDate2', queryPoJobListDto.Inspect2?.Inspect2startDate, queryPoJobListDto.Inspect2?.Inspect2endDate);
    setDateRangeConditionString(conditionPoJob, 'GIGRInfo.GIGRDate', queryPoJobListDto.GIGR?.GIGRstartDate, queryPoJobListDto.GIGR?.GIGRendDate);

    setParams(conditionPoHeader, 'PRNumber', queryPoJobListDto.PRNumber);
    setParams(conditionPoHeader, 'status', queryPoJobListDto.POStatus);
    setParams(conditionPoHeader, 'SalesOrder', queryPoJobListDto.SalesOrder);
    setParams(conditionPoHeader, 'SIMGroup', queryPoJobListDto.SIMGroup, (v) => ({ $in: v }));
    setParams(conditionPoHeader, 'Material', queryPoJobListDto.material);
    setParams(conditionPoHeader, 'Description', queryPoJobListDto.description);
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
