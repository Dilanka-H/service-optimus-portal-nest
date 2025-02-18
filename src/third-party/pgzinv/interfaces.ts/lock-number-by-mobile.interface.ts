export interface ILockNumberByMobile {
  username: string;
  transactionId: string;
  chargeType: string;
  mobileNo: string[];
  numberStatusFrom: string;
  numberStatusTo?: string;
}

export interface ILockNumberByMobileResponse {
  resultCode: string;
  resultDesc: string;
  requestPrepResponse?: Mobile[];
}

interface Mobile {
  mobileNo: string;
}
