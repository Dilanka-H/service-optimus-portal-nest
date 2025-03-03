import { ItemsList } from '../../schema/optimusjoblists.shema';

export interface IOptimusJobListCondition {
  jobId?: string;
  jobDate?: string;
  jobStatus?: string;
  jobType?: string;
  jobZone?: string;
  itemsSize?: { $lt?: number };
}

export interface IOptimusJobListSetParams {
  itemsList?: ItemsList[];
}
