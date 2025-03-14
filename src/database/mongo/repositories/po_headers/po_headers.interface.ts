import { OutputFile1Info, OutputFile2Info } from '../../schema/po_jobs.schema';

export interface PoHeaderCondition {
  PONumber?: string;
  PRNumber?: string;
  status?: string | { $in?: string[]; $nin?: string[] };
  PODate?: { $gte?: Date; $lte?: Date };
  SIMGroup?: { $in: string[] };
  Material?: string;
  Description?: string;
  SalesOrder?: string;
}

export interface PoHeaderSetParams {
  status?: string;
  lastUpdate?: string;
  updatedBy?: string;
}

export interface QueryPoListResponse {
  SIMGroup?: string;
  PODate?: Date;
  PONumber?: string;
  Material?: string;
  Description?: string;
  totalQty?: number;
  totalGIGRQty?: number;
  SIMType?: string;
  jobsInfo: {
    totalJobId?: number;
    totalWaiting?: number;
    totalOnProcess?: number;
    totalMatchSuccess?: number;
    totalRepair?: number;
    totalGIGRComplete?: number;
    totalCancel?: number;
  };
  POStatus: string;
  customerName?: string;
  outputFile1Info?: OutputFile1Info;
  outputFile2Info?: OutputFile2Info;
}
