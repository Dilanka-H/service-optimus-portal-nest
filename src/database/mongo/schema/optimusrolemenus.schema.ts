import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type OptimusRoleMenusDocument = OptimusRoleMenus & Document;

@Schema()
export class OptimusRoleMenus {
@Prop({ type: String })
  idItem: string;

  @Prop({ type: String, unique: true })
  roleName: string;

  @Prop({ type: Array })
  roleMenu: Array<any>; 

  @Prop({ type: Boolean, default: true })
  enterLocationCode: boolean;

  @Prop({ type: Boolean, default: true })
  enterMachineId: boolean;

  @Prop({ type: Boolean })
  status: boolean;

  @Prop({ type: Date, default: Date.now })
  TIMESTAMP: Date;

  @Prop({ type: String })
  updateBy: string;
  }
  
export const OptimusRoleMenusSchema = SchemaFactory.createForClass(OptimusRoleMenus);

