import { ObjectId } from 'mongodb';
import { ItemsList } from 'src/database/mongo/schema/optimusjoblists.shema';

// common
export interface MongoUpdateResponse {
    acknowledged: boolean,  
    matchedCount: number,     
    modifiedCount: number,     
    upsertedCount: number,
    upsertedId: ObjectId | null;
}

export interface IPoJobCondition {
    PONumber?: string
    jobId?: string;  
    jobStatus?: { $in?: string[]; $nin?: string[] }; 
    SalesOrder?: string; 
    "inspectInfo.inspectStatus1"?: string;
    "inspectInfo.inspectDate1"?: { $gte?: string; $lte?: string };
    "inspectInfo.inspectStatus2"?: string;
    "inspectInfo.inspectDate2"?: { $gte?: string; $lte?: string };
    "GIGRInfo.GIGRDate"?: { $gte?: string; $lte?: string };
    username?: string,
    "lockInfo.lockedBy"?: string
}

export interface IPoJobSetParams {
    jobStatus?: string,
    "inspectInfo.inspectStatus1"?: string
    "inspectInfo.inspectStatus2"?: string
    lastUpdate?: string
    lockedBy?: string,
    lockedDateTime?: string
}

export interface IPoHeaderCondition {
    PONumber?: string,
    PRNumber?: string;
    status?: string | { $in?: string[]; $nin?: string[] };
    PODate?: { $gte?: Date; $lte?: Date }
    SIMGroup?: { $in: string[] },
    Material?: string,
    Description?: string
}

export interface IPoHeaderSetParams {
    status?: string
    lastUpdate?: string
}

export interface IOptimusOrderCondition {
    orderNo?: string,
    orderStatus?: string
}

export interface IOptimusOrderSetParams {
    trackingNo?: string,
    forwarderName?: string
    jobListId?: string,
    "moreInfo.jobDate"?: string,
    orderStatus?: string,
    modifyDateTime?: string
}

export interface IOptimusOmniOrderCondition {
    orderNo?: string,
    orderStatus?: string
}

export interface IOptimusOmniOrderSetParams {
    orderStatus?: string,
    "letter.trackingNo"?: string,
    "letter.forwarderName"?: string
}

export interface IOptimusJobListCondition {
    jobId?: string,
    jobDate?: string,
    jobStatus?: string,
    jobType?: string,
    jobZone?: string,
    itemsSize?: { $lt?: number }
}

export interface IOptimusJobListSetParams {
    itemsList?: ItemsList[]
}

export interface IMasterCustomerCondition {
    SAPCode?: string
    customerName?: string,
    "eSim.expireDate"?: { $gte?: string; $lte?: string },
    status?: string | { $ne: string },
    products?: string
}

export interface IMasterCustomerSetParams {
    SAPCode?: string
    customerName?: string,
    categoryCode?: number,
    status?: string,
    updateBy?: string,
    lastUpdate?: Date
}

export interface IOptimusConfigCondition {
    configName?: string
    "Machines.machineNo"?: string
}

export interface IOptimusConfigSetParams {
    "Machines.$.user"?: string
}