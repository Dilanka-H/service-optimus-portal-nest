export interface IQuerySimInfo {
  username: string;
  transactionId: string;
  chargeType: string;
  simSerialNo: string;
}

export interface IQuerySimInfoResponse {
  resultCode: string;
  resultDesc: string;
  simSerialNoList?: ISimSerialInfo[];
}

export interface ISimSerialInfo {
  simSerialNo?: string;
  preparationDate?: string;
  simSerialNoStatus?: string;
  statusDate?: string;
  expiryDate?: string;
  packageNo?: string;
  subRegion?: string;
  packType?: string;
  subPackType?: string;
  mobileNo?: string;
  mobileNoStatus?: string;
  numberClass?: string;
  numberPattern?: string;
  luckyName?: string;
  luckyType?: string;
}
