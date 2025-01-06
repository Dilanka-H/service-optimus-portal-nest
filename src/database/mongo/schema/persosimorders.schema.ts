import { MongoConfiguration } from "src/config/mongo.config";
import { applyEncryption } from "../encryption.helper";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type PersoSimOrdersDocument = PersoSimOrders & Document;

@Schema()
export class PersoSimOrders {
  @Prop({ type: String })
  option: string;

  @Prop({ type: String })
  channel: string;

  @Prop({ type: String })
  locationCode: string;

  @Prop({ type: String })
  orderNo: string;

  @Prop({ type: String })
  transactionId: string;

  @Prop({ type: String })
  orderDateTime: string;

  @Prop({ type: String })
  status: string;

  @Prop({ type: Array }) 
  mobileList: Array<any>;

  @Prop({ type: Date, default: Date.now })
  TIMESTAMP: Date;
}
  
export const PersoSimOrdersSchema = SchemaFactory.createForClass(PersoSimOrders);
