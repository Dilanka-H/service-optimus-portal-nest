export interface IRequestHeaderServiceProvisioning {
  resourceGroupId: string;
  customerOrderType: string;
  userSys: string;
  reTransmit: string;
}

interface IResourceItemServiceProvisioning {
  resourceName: string;
  userId: string;
  originalOperator?: string;
  chargeNode?: string;
  categoryCode?: string;
  productType?: string;
  regionCode?: string;
  numberPattern?: string;
  classifyCode?: string;
  numberStatusFrom?: string;
  numberStatusTo?: string;
  luckyName?: string;
  luckyType?: string;
  quantity?: string;
  mobileNo?: string;
  machineNo?: string;
  jobId?: string;
  package?: string;
  operationType?: string;
  simSerialNo?: string;
  prepNo?: string;
  projectName?: string;
  simType?: string;
  packageRowId?: string;
  offeringName?: string;
  offeringCode?: string;
  eanCode?: string;
  materialCode?: string;
  expiryDate?: string;
  aging?: string;
  chargeType?: string;
}

export interface IRequestServiceProvisioning {
  requestHeader: IRequestHeaderServiceProvisioning;
  resourceItemList: IResourceItemServiceProvisioning[];
}

export interface IResponseServiceProvisioning {
  responseHeader?: IResponseHeader;
  resourceItemList?: IResponseResourceItemList[];
  errorMsg?: any;
}

interface IResponseHeader {
  resourceGroupId: string;
  resourceOrderId: string;
  resultCode: string;
  resultDesc: string;
  developerMessage?: string;
  userSys: string;
  reTransmit: string;
}

interface IResponseResourceItemList {
  resourceName: string;
  resourceItemStatus: string;
  errorFlag: string;
  resourceItemErrMessage: string;
  specialErrHandling: ISpecialErrHandling;
  [key: string]: any;
}

interface ISpecialErrHandling {
  suppCode: string[];
  taskKeyCondition: string[];
  taskDeveloperMessage: string[];
}
