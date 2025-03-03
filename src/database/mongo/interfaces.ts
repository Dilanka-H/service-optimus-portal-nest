import { GIGRInfo, InspectInfo, OutputFile1Info, OutputFile2Info, QuantityInfo } from "./schema/po_jobs.schema";

// queryPOList API
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
    POStatus: string
    customerName?: string; 
    outputFile1Info?: OutputFile1Info; 
    outputFile2Info?: OutputFile2Info; 
}

// queryPOJobListAPI
export interface QueryPoJobListResponse {
    PONumber: string;
    PODate?: Date;
    POStatus?: string;
    PRNumber?: string;
    jobId: string;
    jobStatus: string;
    totalQty?: string;
    quantityInfo?: QuantityInfo; 
    DeliveryDate: Date;
    PrematchOption?: string;
    PrematchDate: string; 
    Material?: string;
    Description?: string;
    Plant?: string;
    SIMGroup?: string;
    Network?: string;
    SIMType?: string;
    Pack?: string;
    customerName?: string;
    BPCustomer: string;
    SalesOrder?: string;
    Remark?: string;
    numberInfo?: {
        NumberStatus?: string;
        Classify?: string;
        Pattern?: string;
        LocationName?: string;
        LuckyName?: string;
        LuckyType?: string;
        NumberType?: string;
        ExpireDate?: string; 
    };
    inspectInfo?: InspectInfo; 
    GIGRInfo?: GIGRInfo; 
    prematchEndTime?: string; 
    BOMCode?: string;
    BOMDesc?: string;
    machineNo: string,
    Pattern_K: string;
    NumberStatus: string;
    eanCode: string;
}