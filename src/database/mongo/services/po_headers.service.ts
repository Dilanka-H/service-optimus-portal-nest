import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PoHeaders } from '../schema/po_headers.schema';
import { IQueryPoListCondition } from 'src/common/interfaces/database_domain.interface';

@Injectable()
export class PoHeadersService {
  constructor(
    @InjectModel(PoHeaders.name) private PoHeadersModel: Model<PoHeaders>,
  ) {}

  async queryPoList(condition: IQueryPoListCondition): Promise<any> {
    return this.PoHeadersModel.aggregate([
            { $match: condition }, 
            {
                $lookup: {
                    from: "po_jobs",                 
                    localField: "PONumber",          
                    foreignField: "PONumber",        
                    as: "jobs"                       
                }
            },
            {
                $addFields: {
                    totalGIGRQty: {
                        $sum: {
                            $map: {
                                input: {
                                    $filter: {
                                        input: "$jobs",
                                        as: "job",
                                        cond: { $eq: ["$$job.jobStatus", "gigr-complete"] }
                                    }
                                },
                                as: "job",
                                in: "$$job.quantityInfo.quantity" 
                            }
                        }
                    },
                    customerName: { $arrayElemAt: ["$jobs.customerName", 0] },
                    outputFile1Info: { $arrayElemAt: ["$jobs.outputFile1Info", 0] },
                    outputFile2Info: { $arrayElemAt: ["$jobs.outputFile2Info", 0] }
                }
            },
            {
                $group: {
                    _id: "$PONumber", 
                    totalJobId: { $sum: { $size: "$jobs" } }, 
                    totalWaiting: {
                        $sum: {
                            $size: {
                                $filter: { input: "$jobs", as: "job", cond: { $eq: ["$$job.jobStatus", "waiting"] } }
                            }
                        }
                    },
                    totalOnProcess: {
                        $sum: {
                            $size: {
                                $filter: { input: "$jobs", as: "job", cond: { $eq: ["$$job.jobStatus", "on-process"] } }
                            }
                        }
                    },
                    totalMatchSuccess: {
                        $sum: {
                            $size: {
                                $filter: { input: "$jobs", as: "job", cond: { $eq: ["$$job.jobStatus", "match-success"] } }
                            }
                        }
                    },
                    totalRepair: {
                        $sum: {
                            $size: {
                                $filter: { input: "$jobs", as: "job", cond: { $eq: ["$$job.jobStatus", "waiting-repair"] } }
                            }
                        }
                    },
                    totalGIGRComplete: {
                        $sum: {
                            $size: {
                                $filter: { input: "$jobs", as: "job", cond: { $eq: ["$$job.jobStatus", "gigr-complete"] } }
                            }
                        }
                    },
                    totalCanceled: {
                        $sum: {
                            $size: {
                                $filter: { input: "$jobs", as: "job", cond: { $eq: ["$$job.jobStatus", "canceled"] } }
                            }
                        }
                    },
                    docs: { $push: "$$ROOT" }
                }
            },
            { 
                $project: {       
                    _id: 0, 
                    SIMGroup: { $first: "$docs.SIMGroup" },
                    PODate: { $first: "$docs.PODate" }, 
                    PONumber: { $first: "$docs.PONumber" },
                    Material: { $first: "$docs.Material" },
                    Description: { $first: "$docs.Description" }, 
                    totalQty: { $first: "$docs.POQtyPlanUsageQty" },
                    totalGIGRQty: { $first: "$docs.totalGIGRQty" },
                    SIMType: { $first: "$docs.SIMType" }, 
                    jobsInfo: {
                        totalJobId: "$totalJobId",
                        totalWaiting: "$totalWaiting",
                        totalOnProcess: "$totalOnProcess",
                        totalMatchSuccess: "$totalMatchSuccess",
                        totalRepair: "$totalRepair",
                        totalGIGRComplete: "$totalGIGRComplete",
                        totalCancel: "$totalCancel",
                    },
                    POStatus: {
                        $switch: {
                            branches: [
                                {
                                    case: { $eq: ["$totalWaiting", "$totalJobId"] }, 
                                    then: "waiting"
                                },
                                {
                                    case: { $eq: ["$totalGIGRComplete", "$totalJobId"] }, 
                                    then: "gigr-complete"
                                },
                                {
                                    case: { $gt: ["$totalCanceled", 0] }, 
                                    then: "canceled"
                                }
                            ],
                            default: "on-process"
                        }
                    },
                    customerName: { $first: "$docs.customerName" },
                    outputFile1Info: { $first: "$docs.outputFile1Info" },
                    outputFile2Info: { $first: "$docs.outputFile2Info" },
                } 
            }
        ]).exec();
    }
}
