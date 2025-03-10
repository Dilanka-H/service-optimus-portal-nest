export interface ConfirmPreparation {
  transactionId: string;
  chargeType: string;
  resourceName?: string;
  operationType?: string;
  userId?: string;
  simSerialNo?: string;
  mobileNo?: string;
  prepNo?: string;
  jobId?: string;
  projectName?: string;
  simType?: string;
  packageRowId?: string;
  offeringName?: string;
  offeringCode?: string;
  package?: string;
  regionCode?: string;
  eanCode?: string;
  materialCode?: string;
  expiryDate?: string;
  aging?: string;
}

export interface ConfirmPreparationResponse {
  resultCode: string;
  resultDesc: string;
  resourceItemStatus?: string;
  resourceItemErrMessage?: string;
  confirmPrepResponse?: ConfirmPrepResponse[];
}

export interface ConfirmPrepResponse {
  simSerialNo: string;
  mobileNo: string;
  prepNo: string;
  expiryDate: string;
  regionCode: string;
  classifyCode: string;
  patternNo: string;
  numberStatusTo: string;
  simType: string;
  package: string;
  packageRowId: string;
  luckyName?: string;
  luckyType?: string;
  qrCodeInfo?: string;
}
