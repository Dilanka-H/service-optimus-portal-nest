import { Injectable } from '@nestjs/common';
import { IPoJobCondition, IReservePoJobToProcessCondition, IReservePoJobToProcessSetParams } from 'src/common/interfaces/database_domain.interface';
import { IReservePoJobToProcessResponse } from 'src/domain/po-order/po-order.services/reserve-po-job-to-process/interfaces';
import { PoJobsService } from 'src/database/mongo/services/po_jobs.service';
import { ReservePoJobToProcessDto } from 'src/domain/po-order/dto/reserve-po-job-to-process.dto';
import { RESULT_FAIL_MESSAGE, RESULT_NOT_FOUND_MESSAGE, RESULT_PASS_MESSAGE, THAI_TIMEZONE } from 'src/common/constants';

const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
const timezone = require("dayjs/plugin/timezone")

dayjs.extend(utc);
dayjs.extend(timezone);

@Injectable()
export class ReservePoJobToProcessService {
    constructor(
        private poJobsService: PoJobsService,
    ){}
    
    async reservePoJobToProcess(reservePoJobToProcessDto: ReservePoJobToProcessDto) {
        const condition: IReservePoJobToProcessCondition = {} as IReservePoJobToProcessCondition
        const setParams: IReservePoJobToProcessSetParams = {} as IReservePoJobToProcessSetParams
        const response: IReservePoJobToProcessResponse[] = []

        for(const jobId of reservePoJobToProcessDto.jobId) {
            condition.jobId = jobId
            condition.username = reservePoJobToProcessDto.tokenUser
            if (reservePoJobToProcessDto.reserveFlag) {
                setParams.lockedBy = reservePoJobToProcessDto.tokenUser
                setParams.lockedDateTime = dayjs.tz(Date.now(), THAI_TIMEZONE).utc().toISOString()
            } else {
                setParams.lockedBy = ""
                setParams.lockedDateTime = ""
            }
            const result = await this.poJobsService.reservePoJobToProcess(condition, setParams)
            if (result) {
                response.push({jobId: jobId, lockedBy: condition.username, result: RESULT_PASS_MESSAGE})
            } else {
                const findCondition: IPoJobCondition = { jobId: jobId };
                const existingDocument = await this.poJobsService.findPoJob(findCondition, "jobId lockInfo");

                if (existingDocument && existingDocument.length > 0) {
                    response.push({jobId: existingDocument[0]["jobId"], lockedBy: existingDocument[0]["lockInfo"]["lockedBy"], result: RESULT_FAIL_MESSAGE,})
                } else {
                    response.push({jobId: jobId, lockedBy: "", result: RESULT_NOT_FOUND_MESSAGE})
                }
            }   
        }
        
        return response
    }
}
