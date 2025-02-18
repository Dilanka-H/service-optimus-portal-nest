import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, SchemaTypes } from 'mongoose';

export type OptimusConfigsDocument = OptimusConfigs & Document;

@Schema()
export class Machines {
  @Prop({ type: String })
  machineNo: string;

  @Prop({ type: String })
  user: string;
}

export const MachinesSchema = SchemaFactory.createForClass(Machines);

@Schema()
export class OptimusConfigs {
  @Prop({ type: String })
  idItem: string;

  @Prop({ type: String })
  configName: string;

  @Prop({ type: String })
  status: string;

  @Prop({ type: SchemaTypes.Mixed })
  data: object;

  @Prop({ type: String })
  updateBy: string;

  @Prop({ type: [MachinesSchema] })
  Machines: Machines[];

  @Prop({ type: Date, default: Date.now })
  TIMESTAMP: Date;
}
  
export const OptimusConfigsSchema = SchemaFactory.createForClass(OptimusConfigs);