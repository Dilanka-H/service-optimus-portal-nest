export interface IOptimusOrderCondition {
  orderNo?: string;
  orderStatus?: string;
}

export interface IOptimusOrderSetParams {
  trackingNo?: string;
  forwarderName?: string;
  jobListId?: string;
  'moreInfo.jobDate'?: string;
  orderStatus?: string;
  modifyDateTime?: string;
}
