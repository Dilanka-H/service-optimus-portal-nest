import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type PoHeadersDocument = PoHeaders & Document;

@Schema()
export class LockInfo {
  @Prop({ type: String })
  lockedBy: string;

  @Prop({ type: String })
  lockedDateTime: string;
}

export const LockInfoSchema = SchemaFactory.createForClass(LockInfo);

@Schema({ collection: 'po_headers' })
export class PoHeaders {
    @Prop({ type: String, required: true })
    PONumber: string;
  
    @Prop({ type: String, required: true })
    POItem: string;
  
    @Prop({ type: Date, required: true })
    PODate: Date;
  
    @Prop({ type: String, required: true })
    PRNumber: string;
  
    @Prop({ type: Number })
    PRItem: number;
  
    @Prop({ type: String })
    PlanningID: string;
  
    @Prop({ type: Date })
    PlanDate: Date;
  
    @Prop({ type: Date })
    DeliveryDate: Date;
  
    @Prop({ type: String })
    status: string;

    @Prop({ type: LockInfoSchema })
    lockInfo: LockInfo;
  
    @Prop({ type: String })
    Material: string;
  
    @Prop({ type: String })
    Description: string;
  
    @Prop({ type: String })
    Plant: string;
  
    @Prop({ type: String })
    Storagelocation: string;
  
    @Prop({ type: String })
    Region: string;
  
    @Prop({ type: Number })
    PRQty: number;
  
    @Prop({ type: Number })
    POQtyPlanUsageQty: number;
  
    @Prop({ type: String })
    UnitofMeasure: string;
  
    @Prop({ type: String })
    EAN_UPC_PC: string;
  
    @Prop({ type: String })
    EAN_UPC_CAR: string;
  
    @Prop({ type: String })
    SIMGroup: string;
  
    @Prop({ type: String })
    Network_K: string;
  
    @Prop({ type: String })
    Network: string;
  
    @Prop({ type: String })
    SIMType_K: string;
  
    @Prop({ type: String })
    SIMType: string;
  
    @Prop({ type: String })
    Pack_K: string;
  
    @Prop({ type: String })
    Pack: string;
  
    @Prop({ type: String })
    NumberType_K: string;
  
    @Prop({ type: String })
    NumberType: string;
  
    @Prop({ type: String })
    NumberStatus_K: string;
  
    @Prop({ type: String })
    NumberStatus: string;
  
    @Prop({ type: String })
    Classify_K: string;
  
    @Prop({ type: String })
    Classify: string;
  
    @Prop({ type: String })
    Pattern_K: string;
  
    @Prop({ type: String })
    Pattern: string;
  
    @Prop({ type: String })
    LuckyName_K: string;
  
    @Prop({ type: String })
    LuckyName: string;
  
    @Prop({ type: String })
    LuckyType_K: string;
  
    @Prop({ type: String })
    LuckyType: string;
  
    @Prop({ type: String })
    ExpireDate: string;
  
    @Prop({ type: String })
    Remark: string;
  
    @Prop({ type: String })
    LocationName_K: string;
  
    @Prop({ type: String })
    LocationName: string;
  
    @Prop({ type: String })
    PrematchOption: string;
  
    @Prop({ type: String })
    SIMProject: string;
  
    @Prop({ type: String })
    SalesOrder: string;
  
    @Prop({ type: String })
    SalesOrderItem: string;
  
    @Prop({ type: String })
    BPCustomer: string;
  
    @Prop({ type: Date, default: Date.now })
    TIMESTAMP: Date;
  
    @Prop({ type: Date, default: Date.now })
    lastUpdate: Date;
}

export const PoHeadersSchema = SchemaFactory.createForClass(PoHeaders);

PoHeadersSchema.index({ PONumber: 1, POItem: 1 })
PoHeadersSchema.index({ status: 1 })
PoHeadersSchema.index({ TIMESTAMP: 1 })
