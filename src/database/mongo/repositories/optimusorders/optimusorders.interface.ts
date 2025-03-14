export interface OptimusOrderCondition {
  orderNo?: string;
  orderStatus?: string;
}

export interface OptimusOrderSetParams {
  trackingNo?: string;
  forwarderName?: string;
  jobListId?: string;
  'moreInfo.jobDate'?: string;
  orderStatus?: string;
  modifyDateTime?: string;
}
