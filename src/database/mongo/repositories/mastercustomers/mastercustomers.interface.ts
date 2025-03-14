export interface MasterCustomerCondition {
  SAPCode?: string;
  customerName?: string;
  'eSim.expireDate'?: { $gte?: string; $lte?: string };
  status?: string | { $ne: string };
  products?: string;
}

export interface MasterCustomerSetParams {
  SAPCode?: string;
  customerName?: string;
  categoryCode?: number;
  status?: string;
  updateBy?: string;
  lastUpdate?: Date;
}
