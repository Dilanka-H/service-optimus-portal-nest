import { ItemsList } from '../../schema/optimusjoblists.shema';

export interface OptimusJobListCondition {
  jobId?: string;
  jobDate?: string;
  jobStatus?: string;
  jobType?: string;
  jobZone?: string;
  itemsSize?: { $lt?: number };
}

export interface OptimusJobListSetParams {
  itemsList?: ItemsList[];
}
