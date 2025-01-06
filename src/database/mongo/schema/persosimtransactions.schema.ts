import { MongoConfiguration } from "src/config/mongo.config";
import { applyEncryption } from "../encryption.helper";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type PersoSimTransactionsDocument = PersoSimTransactions & Document;

@Schema()
export class PersoSimTransactions {
    @Prop({ type: String })
    transactionId: string;
  
    @Prop({ type: String })
    channel: string;
  
    @Prop({ type: String })
    locationCode: string;
  
    @Prop({ type: String })
    orderNo: string;
  
    @Prop({ type: String })
    orderStatus: string;
  
    @Prop({ type: String })
    orderDateTime: string;
  
    @Prop({ type: String })
    addDateTime: string;
  
    @Prop({ type: String })
    startTime: string;
  
    @Prop({ type: String })
    endTime: string;
  
    @Prop({ type: String })
    newMobileNo: string;
  
    @Prop({ type: String })
    simSerial: string;
  
    @Prop({ type: Object })
    moreInfo: Object;
  
    @Prop({ type: Date, default: Date.now })
    TIMESTAMP: Date;
}
  
export const PersoSimTransactionsSchema = SchemaFactory.createForClass(PersoSimTransactions);
