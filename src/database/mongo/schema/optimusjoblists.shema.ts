import { MongoConfiguration } from "src/config/mongo.config";
import { applyEncryption } from "../encryption.helper";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type OptimusJobListsDocument = OptimusJobLists & Document;

@Schema()
export class ItemsList {
  @Prop({ type: String })
  serialNo: string;

  @Prop({ type: String })
  imsi: string;

  @Prop({ type: String })
  nuNotifyFlag: string;

  @Prop({ type: String })
  orderStatus: string;

  @Prop({ type: String })
  prepTransactionNo: string;
}

@Schema()
export class OptimusJobLists {
  @Prop({ required: true })
  jobStatus: string;

  @Prop({ required: true })
  jobId: string;

  @Prop({ required: true })
  jobName: string;

  @Prop({ required: true })
  orderDate: string;

  @Prop({ required: true })
  jobType: string;

  @Prop({ required: true })
  createBy: string;

  @Prop({ required: true })
  updateBy: string;

  @Prop({ required: true, default: Date.now })
  TIMESTAMP: Date;

  @Prop({ required: true })
  forwarderName: string;

  @Prop({ required: true })
  jobDate: string;

  @Prop({ required: true })
  itemsSize: number;

  @Prop({ type: [ItemsList], default: [] })
  itemsList: ItemsList[];
}

export const OptimusJobListsSchema = SchemaFactory.createForClass(OptimusJobLists);

export function encryptOptimusJobListsSchema(mongoConfig: MongoConfiguration) {
    applyEncryption(OptimusJobListsSchema, mongoConfig, ["jobStatus"]);
}
