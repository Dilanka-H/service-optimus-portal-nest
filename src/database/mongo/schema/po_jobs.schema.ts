import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type PoJobsDocument = PoJobs & Document;

@Schema()
export class QuantityInfo {
  @Prop({ type: String })
  region: string;

  @Prop({ type: Number })
  quantity: number;
}

export const QuantityInfoSchema = SchemaFactory.createForClass(QuantityInfo);

@Schema()
export class InspectInfo {
    @Prop({ type: String, required: false })
    inspectStatus1: string;
  
    @Prop({ type: String })
    inspectDate1: string;

    @Prop({ type: String })
    inspectUser1: string;
  
    @Prop({ type: String })
    inspectStatus2: string;

    @Prop({ type: String })
    inspectDate2: string;
  
    @Prop({ type: String })
    inspectUser2: string;

    @Prop({ type: String })
    inspect2IgnoreReason: string;
}
  
export const InspectInfoSchema = SchemaFactory.createForClass(InspectInfo);

@Schema()
export class MaterialList {
    @Prop({ type: String })
    Material: string;
  
    @Prop({ type: String })
    Desciption: string;

    @Prop({ type: String })
    EAN_UPC_PC: string;
}
  
export const MaterialListSchema = SchemaFactory.createForClass(MaterialList);

@Schema()
export class LockInfo {
    @Prop({ type: String })
    lockedBy: string;
  
    @Prop({ type: String })
    lockedDateTime: string;
  }
  
export const LockInfoSchema = SchemaFactory.createForClass(LockInfo);

@Schema()
export class OutputFile1Info {
  @Prop({ type: String, default: '' })
  serialNo: string;

  @Prop({ type: String, default: '' })
  mobileNo: string;

  @Prop({ type: String, default: '' })
  package: string;

  @Prop({ type: String, default: '' })
  expDate: string;

  @Prop({ type: String, default: '' })
  regionCode: string;

  @Prop({ type: String, default: '' })
  region: string;

  @Prop({ type: String, default: '' })
  pack: string;

  @Prop({ type: String, default: '' })
  matCode: string;

  @Prop({ type: String, default: '' })
  reserveExpDate: string;
}
  
export const OutputFile1InfoSchema = SchemaFactory.createForClass(OutputFile1Info);

@Schema()
export class OutputFile2Info {
    @Prop({ type: String, default: '' })
    qrCodeInfo: string;
}
    
export const OutputFile2InfoSchema = SchemaFactory.createForClass(OutputFile2Info);

@Schema()
export class GIGRInfo {
    @Prop({ type: String, default: '' })
    GIDocNo: string;

    @Prop({ type: String, default: '' })
    GIDate: string;

    @Prop({ type: String, default: '' })
    GRDocNo: string;

    @Prop({ type: String, default: '' })
    GRDate: string;

    @Prop({ type: String, default: '' })
    GIGRDate: string;

    @Prop({ type: String, default: '' })
    GIGRUser: string;
}
    
export const GIGRInfoSchema = SchemaFactory.createForClass(GIGRInfo);

@Schema({collection: 'po_jobs'})
export class PoJobs {
  @Prop({ type: String })
  PONumber: string;

  @Prop({ type: String })
  POItem: string;

  @Prop({ type: String })
  jobStatus: string;

  @Prop({ type: String })
  jobId: string;

  @Prop({ type: Date })
  jobDate: Date;

  @Prop({ type: String })
  itemRefId: string;

  @Prop({ type: QuantityInfoSchema })
  quantityInfo: QuantityInfo

  @Prop({ type: InspectInfoSchema })
  inspectInfo: InspectInfo

  @Prop({ type: MaterialListSchema })
  materialList: MaterialList

  @Prop({ type: String })
  machineNo: string;

  @Prop({ type: String })
  updatedBy: string;

  @Prop({ type: LockInfoSchema })
  lockInfo: LockInfo

  @Prop({ type: OutputFile1InfoSchema })
  outputFile1Info: OutputFile1Info

  @Prop({ type: OutputFile2InfoSchema })
  outputFile2Info: OutputFile2Info

  @Prop({ type: GIGRInfoSchema })
  GIGRInfo: GIGRInfo

  @Prop({ type: String })
  BPCustomer: string;

  @Prop({ type: String })
  customerName: string;

  @Prop({ type: String })
  BOMCode: string;

  @Prop({ type: String })
  BOMDesc: string;

  @Prop({ type: String })
  prematchEndTime: string;

  @Prop({ type: String })
  prematchStartTime: string;

  @Prop({ type: String })
  EAN_UPC_CAR: string;

  @Prop({ type: String })
  EAN_UPC_PC: string;

  @Prop({ type: Array })
  mobileList: string[];

  @Prop({ type: Date, default: Date.now })
  lastUpdate: Date;

  @Prop({ type: Date, default: Date.now })
  TIMESTAMP: Date;
}

export const PoJobsSchema = SchemaFactory.createForClass(PoJobs);

PoJobsSchema.index({ PONumber: 1, POItem: 1, status: 1 })
PoJobsSchema.index({ PONumber: 1 })
PoJobsSchema.index({ PONumber: 1, POItem: 1})
PoJobsSchema.index({ Description: 1 })
PoJobsSchema.index({ SIMGroup: 1 })
PoJobsSchema.index({ itemRefId: 1 })
PoJobsSchema.index({ jobId: 1 })
PoJobsSchema.index({ jobDate: 1 })
PoJobsSchema.index({ jobStatus: 1 })
PoJobsSchema.index({ machineNo: 1 })
PoJobsSchema.index({ updateBy: 1 })
PoJobsSchema.index({ lastUpdate: 1 })
PoJobsSchema.index({ TIMESTAMP: 1 })
