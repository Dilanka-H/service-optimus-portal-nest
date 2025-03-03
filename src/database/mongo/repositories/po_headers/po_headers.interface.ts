export interface PoHeaderCondition {
    PONumber?: string,
    PRNumber?: string;
    status?: string | { $in?: string[]; $nin?: string[] };
    PODate?: { $gte?: Date; $lte?: Date }
    SIMGroup?: { $in: string[] },
    Material?: string,
    Description?: string
}

export interface PoHeaderSetParams {
    status?: string
    lastUpdate?: string
}