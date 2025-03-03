import { ObjectId } from 'mongodb';

// common
export interface MongoUpdateResponse {
  acknowledged: boolean;
  matchedCount: number;
  modifiedCount: number;
  upsertedCount: number;
  upsertedId: ObjectId | null;
}

export interface IOptimusOmniOrderCondition {
  orderNo?: string;
  orderStatus?: string;
}

export interface IOptimusOmniOrderSetParams {
  orderStatus?: string;
  'letter.trackingNo'?: string;
  'letter.forwarderName'?: string;
}

export interface IOptimusConfigCondition {
  configName?: string;
  'Machines.machineNo'?: string;
}

export interface IOptimusConfigSetParams {
  'Machines.$.user'?: string;
}
