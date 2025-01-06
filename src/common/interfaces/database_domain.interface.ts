// API queryPoList
export interface IQueryPoListCondition {
    PONumber?: string,
    PRNumber?: string,
    status?: { $in: string[] },
    PODate?: { $gte?: Date; $lte?: Date }
    SIMGroup?: { $in: string[] },
    Material?: string,
    Description?: string
}

// API updatePoJobToProcess
export interface IReservePoJobToProcessCondition {
    jobId: string,
    username: string
}

export interface IReservePoJobToProcessSetParams {
    lockedBy: string,
    lockedDateTime: string
}

// common
export interface IPoJobCondition {
    jobId?: string,
}

export interface IPoJobSetParams {
    jobStatus?: string,
    "inspectInfo.inspectStatus1"?: string
    "inspectInfo.inspectStatus2"?: string
}