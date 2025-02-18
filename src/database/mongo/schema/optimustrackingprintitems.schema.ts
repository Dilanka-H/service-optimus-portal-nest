import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type OptimusTrackingPrintItemsDocument = OptimusTrackingPrintItems & Document;

@Schema()
export class OptimusTrackingPrintItems {
  @Prop({ type: String })
  channel: string;

  @Prop({ type: String })
  refNo: string;

  @Prop({ type: String })
  printDate: string;

  @Prop({ type: Number, default: 1 })
  printCounter: number;

  @Prop({ type: String, default: 'MNP' })
  orderType: string;

  @Prop({ type: Array }) 
  itemsList: Array<any>; 

  @Prop({ type: Date, default: Date.now })
  TIMESTAMP: Date;
  }
  
export const OptimusTrackingPrintItemsSchema = SchemaFactory.createForClass(OptimusTrackingPrintItems);

OptimusTrackingPrintItemsSchema.index({ refNo: -1 });

