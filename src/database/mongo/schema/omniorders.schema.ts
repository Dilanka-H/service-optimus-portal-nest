import { MongoConfiguration } from "src/config/mongo.config";
import { applyEncryption } from "../encryption.helper";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type OmniOrdersDocument = OmniOrders & Document;

@Schema()
export class OmniOrders {
    @Prop({ type: String })
  option: string;

  @Prop({ type: String })
  transactionId: string;

  @Prop({ type: String })
  processType: string;

  @Prop({ type: String })
  channel: string;

  @Prop({ type: String })
  orderNo: string;

  @Prop({ type: String })
  orderDateTime: string;

  @Prop({ type: String })
  createDateTime: string;

  @Prop({ type: String })
  modifyDateTime: string;

  @Prop({ type: String })
  orderStatus: string;

  @Prop({ type: Object })
  letter: object;

  @Prop({ type: Object })
  other: object;

  @Prop({ type: String })
  packageFee: string;

  @Prop({ type: String })
  logisticCost: string;

  @Prop({ type: String })
  locationCode: string;

  @Prop({ type: String })
  postTest: string;

  @Prop({ type: Boolean })
  isRepair: boolean;

  @Prop({ type: String })
  cancelReason: string;

  @Prop({ type: Object })
  moreInfo: object;

  @Prop({ type: String })
  cancelBy: string;

  @Prop({ type: String })
  updateBy: string;

  @Prop({ type: String })
  cancelDateTime: string;

  @Prop({ type: Array })
  mobileList: any[];

  @Prop({ type: Number })
  itemSize: number;

  @Prop({ type: Date, default: Date.now })
  TIMESTAMP: Date;
}

export const OmniOrdersSchema = SchemaFactory.createForClass(OmniOrders);

OmniOrdersSchema.index({ orderNo: 1 })
