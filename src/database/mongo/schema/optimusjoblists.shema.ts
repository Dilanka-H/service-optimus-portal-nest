import { MongoConfiguration } from "src/config/mongo.config";
import { applyEncryption } from "../encryption.helper";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type OptimusJobListsDocument = OptimusJobLists & Document;

@Schema()
export class ItemsList {
  @Prop({ type: String })
  orderNo: string;

  @Prop({ type: String })
  orderStatus: string;

  @Prop({ type: String })
  orderDateTime: string;

  @Prop({ type: String })
  newMobileNo: string;

  @Prop({ type: String, required: false })
  serialNo: string;
}

export const ItemsListSchema = SchemaFactory.createForClass(ItemsList);

@Schema()
export class OptimusJobLists {
  @Prop({})
  jobStatus: string;

  @Prop({})
  jobId: string;

  @Prop({})
  jobName: string;

  @Prop({})
  orderType: string;

  @Prop({})
  jobZone: string;

  @Prop({})
  orderDate: string;

  @Prop({})
  jobType: string;

  @Prop({})
  createBy: string;

  @Prop({})
  updateBy: string;

  @Prop({ default: Date.now })
  TIMESTAMP: Date;

  @Prop({})
  forwarderName: string;

  @Prop({})
  jobDate: string;

  @Prop({})
  itemsSize: number;

  @Prop({ type: [ItemsList], default: [] })
  itemsList: ItemsList[];
}

export const OptimusJobListsSchema = SchemaFactory.createForClass(OptimusJobLists);

export function encryptOptimusJobListsSchema(mongoConfig: MongoConfiguration) {
    applyEncryption(OptimusJobListsSchema, mongoConfig, ["jobStatus"]);
    applyEncryption(ItemsListSchema, mongoConfig, ["newMobileNo"]);
}
