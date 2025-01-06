import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type OptimusConfigMachinesDocument = OptimusConfigMachines & Document;

@Schema()
export class OptimusConfigMachines {
    @Prop({ type: String })
    macAddressPC: string;
  
    @Prop({ type: Object })
    machineList: object;
  
    @Prop({ type: String })
    TIMESTAMP: string;
}
  
export const OptimusConfigMachinesSchema = SchemaFactory.createForClass(OptimusConfigMachines);