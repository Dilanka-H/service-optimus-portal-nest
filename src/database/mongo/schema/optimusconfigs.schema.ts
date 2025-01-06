import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type OptimusConfigsDocument = OptimusConfigs & Document;

@Schema()
export class OptimusConfigs {
  @Prop({ type: String })
  idItem: string;

  @Prop({ type: String })
  configName: string;

  @Prop({ type: String })
  status: string;

  @Prop({ type: Object })
  data: object;

  @Prop({ type: String })
  updateBy: string;

  @Prop({ type: Date, default: Date.now })
  TIMESTAMP: Date;
}
  
export const OptimusConfigsSchema = SchemaFactory.createForClass(OptimusConfigs);