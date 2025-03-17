import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as utc from 'dayjs/plugin/utc';
import { Model } from 'mongoose';
import { RESULT_FAIL_MESSAGE, RESULT_NOT_FOUND_MESSAGE, TIMEZONE_THAI } from 'src/common/constants';
import { setObjectParams } from 'src/common/utils';
import { MongoService } from 'src/database/mongo/mongo.service';
import { PoHeaderCondition, PoHeaderSetParams } from 'src/database/mongo/repositories/po_headers/po_headers.interface';
import { PoJobCondition, PoJobSetParams } from 'src/database/mongo/repositories/po_jobs/po_jobs.interface';
import { PoJobsRepository } from 'src/database/mongo/repositories/po_jobs/po_jobs.respository';
import { PoHeaders, PoHeadersDocument } from 'src/database/mongo/schema/po_headers.schema';
import { PoJobs, PoJobsDocument } from 'src/database/mongo/schema/po_jobs.schema';
import { ReservePoJobToProcessDto } from 'src/domain/po-order/dto/reserve-po-job-to-process.dto';
import { IReservePoJobToProcessResponse } from 'src/domain/po-order/po-order.services/reserve-po-job-to-process/interfaces';

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class ReservePoJobToProcessService {
  constructor(
    @InjectModel(PoJobs.name) private PoJobsModel: Model<PoJobsDocument>,
    @InjectModel(PoHeaders.name) private PoHeadersModel: Model<PoHeadersDocument>,
    private poJobsRepository: PoJobsRepository,
    private mongoService: MongoService,
  ) {}

  async reservePoJobToProcess(reservePoJobToProcessDto: ReservePoJobToProcessDto) {
    const username = reservePoJobToProcessDto.tokenUser;
    const conditionReserve: PoJobCondition = {} as PoJobCondition;
    const setParamsReserve: PoJobSetParams = { updatedBy: username };
    const response: IReservePoJobToProcessResponse[] = [];

    for (const jobId of reservePoJobToProcessDto.jobId) {
      const currentDate = dayjs.tz(Date.now(), TIMEZONE_THAI).utc().toISOString();
      conditionReserve.jobId = jobId;
      if (reservePoJobToProcessDto.reserveFlag) {
        setParamsReserve['lockInfo.lockedBy'] = reservePoJobToProcessDto.tokenUser;
        setParamsReserve['lockInfo.lockedDateTime'] = currentDate;
      } else {
        setParamsReserve['lockInfo.lockedBy'] = '';
        setParamsReserve['lockInfo.lockedDateTime'] = '';
      }
      const result = await this.poJobsRepository.reservePoJobToProcess(conditionReserve, setParamsReserve);
      if (result) {
        const conditionPoJob: PoJobCondition = {} as PoJobCondition;
        const conditionPoHeader: PoHeaderCondition = { PONumber: jobId.split('_')[0] } as PoHeaderCondition;
        const setParamsPoJob: PoJobSetParams = { updatedBy: username, lastUpdate: currentDate };
        const setParamsPoHeader: PoHeaderSetParams = { updatedBy: username, lastUpdate: currentDate };

        setObjectParams(setParamsPoHeader, 'status', reservePoJobToProcessDto.POStatus);

        setObjectParams(setParamsPoJob, 'jobStatus', reservePoJobToProcessDto.jobStatus);
        setObjectParams(setParamsPoJob, 'inspectInfo.inspectStatus1', reservePoJobToProcessDto.inspectStatus1);
        setObjectParams(setParamsPoJob, 'inspectInfo.inspectDate1', reservePoJobToProcessDto.inspectStatus1, () => currentDate);
        setObjectParams(setParamsPoJob, 'inspectInfo.inspectUser1', reservePoJobToProcessDto.inspectStatus1, () => username);
        setObjectParams(setParamsPoJob, 'inspectInfo.inspectStatus2', reservePoJobToProcessDto.inspectStatus2);
        setObjectParams(setParamsPoJob, 'inspectInfo.inspectDate2', reservePoJobToProcessDto.inspectStatus2, () => currentDate);
        setObjectParams(setParamsPoJob, 'inspectInfo.inspectUser2', reservePoJobToProcessDto.inspectStatus2, () => username);

        if (Object.keys(setParamsPoJob) && Object.keys(setParamsPoJob).length > 2) {
          await this.mongoService.updateManyDocuments(this.PoJobsModel, conditionPoJob, setParamsPoJob);
        }
        if (setParamsPoHeader.status) {
          await this.mongoService.updateManyDocuments(this.PoHeadersModel, conditionPoHeader, setParamsPoHeader);
        }
      } else {
        const findCondition: PoJobCondition = { jobId: jobId };
        const existingDocument = await this.mongoService.findDocuments(this.PoJobsModel, findCondition, 'jobId lockInfo');

        if (existingDocument && existingDocument.length > 0) {
          response.push({
            jobId: existingDocument[0].jobId,
            lockedBy: existingDocument[0].lockInfo.lockedBy,
            result: RESULT_FAIL_MESSAGE,
          });
        } else {
          response.push({ jobId: jobId, lockedBy: '', result: RESULT_NOT_FOUND_MESSAGE });
        }
      }
    }

    return response;
  }
}
