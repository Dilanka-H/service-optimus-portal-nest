import { MongoConfiguration } from "src/config/mongo.config";
import { applyEncryption } from "../encryption.helper";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type OptimusPersoSimOrdersDocument = OptimusPersoSimOrders & Document;

@Schema()
export class OptimusPersoSimOrders {
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
    addDateTime: string;
  
    @Prop({ type: String })
    newMobileNo: string;
  
    @Prop({ type: String })
    chargeType: string;
  
    @Prop({ type: String })
    simService: string;
  
    @Prop({ type: String })
    orderStatus: string;
  
    @Prop({ type: Object })
    moreInfo: object;
  
    @Prop({ type: String })
    createBy: string;
  
    @Prop({ type: String })
    updateBy: string;
  
    @Prop({ type: Date, default: Date.now })
    TIMESTAMP: Date;
}

export const OptimusPersoSimOrdersSchema = SchemaFactory.createForClass(OptimusPersoSimOrders);
