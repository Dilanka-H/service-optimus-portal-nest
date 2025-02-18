import { MongoConfiguration } from "src/config/mongo.config";
import { applyEncryption } from "../encryption.helper";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type MasterCustomersDocument = MasterCustomers & Document;

@Schema()
export class ESIM {
  @Prop({ type: String })
  PGPKey: string;

  @Prop({ type: String })
  expireDate: string;

  @Prop({ type: String })
  outputFileType: string;

  @Prop({ type: String })
  fileName: string;

  @Prop({ type: String })
  fileId: string;
}

export const ESIMSchema = SchemaFactory.createForClass(ESIM);

@Schema({ collection: 'master_customers' })
export class MasterCustomers {
    @Prop({ type: String })
    SAPCode: string;

    @Prop({ type: Number })
    categoryCode: number;

    @Prop({ type: String })
    customerName: string;

    @Prop({ type: ESIMSchema })
    eSim: ESIM;

    @Prop({ type: [String] })
    products: string[];

    @Prop({ type: [String] })
    email: string[];

    @Prop({ type: String })
    status: string;

    @Prop({ type: String })
    createBy: string;

    @Prop({ type: String })
    updateBy: string;

    @Prop({ type: Date, default: Date.now })
    lastUpdate: Date;

    @Prop({ type: Date, default: Date.now })
    TIMESTAMP: Date;
}

export const MasterCustomersSchema = SchemaFactory.createForClass(MasterCustomers);

MasterCustomersSchema.index({ "eSim.expireDate": 1 })
MasterCustomersSchema.index({ SAPCode:1, customerName: 1, status:1 })
MasterCustomersSchema.index({ SAPCode:1 })
MasterCustomersSchema.index({ customerName:1 })
MasterCustomersSchema.index({ status:1 })

export function encryptMasterCustomersSchema(mongoConfig: MongoConfiguration) {
    applyEncryption(MasterCustomersSchema, mongoConfig, ["email"]);
    applyEncryption(ESIMSchema, mongoConfig, ["PGPKey"]);
}
