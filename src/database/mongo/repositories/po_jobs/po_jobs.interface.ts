export interface PoJobCondition {
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

export interface PoJobSetParams {
    jobStatus?: string,
    "inspectInfo.inspectStatus1"?: string
    "inspectInfo.inspectStatus2"?: string
    lastUpdate?: string
    lockedBy?: string,
    lockedDateTime?: string
}
