import { GIGRInfo, InspectInfo, QuantityInfo } from '../../schema/po_jobs.schema';

export interface PoJobCondition {
  PONumber?: string;
  jobId?: string;
  jobStatus?: { $in?: string[]; $nin?: string[] };
  'inspectInfo.inspectStatus1'?: string;
  'inspectInfo.inspectDate1'?: { $gte?: string; $lte?: string };
  'inspectInfo.inspectStatus2'?: string;
  'inspectInfo.inspectDate2'?: { $gte?: string; $lte?: string };
  'GIGRInfo.GIGRDate'?: { $gte?: string; $lte?: string };
  username?: string;
  'lockInfo.lockedBy'?: string;
}

export interface PoJobSetParams {
  jobStatus?: string;
  'inspectInfo.inspectStatus1'?: string;
  'inspectInfo.inspectStatus2'?: string;
  'inspectInfo.inspectDate1'?: string;
  'inspectInfo.inspectDate2'?: string;
  'inspectInfo.inspectUser1'?: string;
  'inspectInfo.inspectUser2'?: string;
  'inspectInfo.inspect2IgnoreReason'?: string;
  lastUpdate?: string;
  'lockInfo.lockedBy'?: string;
  'lockInfo.lockedDateTime'?: string;
  updatedBy?: string;
  flagSendMail?: boolean;
}

export interface QueryPoJobListResponse {
  PONumber?: number;
  POItem?: string;
  PODate?: Date;
  POStatus?: string;
  POStatusDate?: Date;
  PRNumber?: string;
  PRItem?: string;
  jobId?: number;
  jobStatus?: string;
  jobStatusDate?: Date;
  PRtotalQty?: number;
  totalQty?: number;
  quantityInfo?: QuantityInfo;
  DeliveryDate?: Date;
  materialPO?: string;
  descriptionPO?: string;
  eanCodePO?: string;
  eanCarton?: string;
  Plant?: string;
  Storagelocation?: string;
  SalesOrder?: string;
  SalesOrderItem?: string;
  SIMGroup?: string;
  customerName?: string;
  BPCustomer?: string;
  Remark?: string;
  numberInfo?: {
    NumberStatus?: string;
    NumberStatus_K?: string;
    NumberType?: string;
    NumberType_K?: string;
    Classify?: string;
    Classify_K?: string;
    Pattern?: string;
    Pattern_K?: string;
    LuckyName?: string;
    LuckyName_K?: string;
    LuckyType?: string;
    LuckyType_K?: string;
    Pack?: string;
    Pack_K?: string;
    SIMType?: string;
    SIMType_K?: string;
    Network?: string;
    Network_K?: string;
    ExpireDate?: Date;
    LocationName?: string;
  };
  inspectInfo?: InspectInfo;
  GIGRInfo?: GIGRInfo;
  PrematchOption?: string;
  PrematchDate?: Date;
  prematchEndTime?: Date;
  BOMCode?: string;
  BOMDesc?: string;
  machineNo?: string;
  serialList?: any[];
  unitofMeasure?: string;
  simProject?: string;
  lastUpdate?: Date;
  updatedBy?: string;
}
