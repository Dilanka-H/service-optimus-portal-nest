export interface ILockNumberByCriteria {
  username: string;
  transactionId: string;
  chargeType: string;
  regionCode: string;
  numberPattern: string;
  classifyCode: string;
  numberStatusFrom: string;
  numberStatusTo?: string;
  luckyName?: string;
  luckyType?: string;
  quantity: string;
}

export interface ILockNumberByCriteriaResponse {
  resultCode: string;
  resultDesc: string;
  requestPrepResponse?: Mobile[];
}

interface Mobile {
  mobileNo: string;
}
