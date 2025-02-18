export interface IRequestPrepNo {
  username: string;
  transactionId: string;
  chargeType: string;
  quantity: string;
  machineNo: string;
  package: string;
  jobId: string;
}

export interface IRequestPrepNoResponse {
  resultCode: string;
  resultDesc: string;
  packageRowId?: string;
  offeringName?: string;
  offeringCode?: string;
  prepNoFrom?: string;
  prepNoTo?: string;
}
