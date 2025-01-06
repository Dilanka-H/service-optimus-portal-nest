import { MongoConfiguration } from "src/config/mongo.config";
import { applyEncryption } from "../encryption.helper";
import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type OptimusUserRolesDocument = OptimusUserRoles & Document;

@Schema()
export class OptimusUserRoles {
    @Prop({ type: String })
    idItem: string;
  
    @Prop({ type: String })
    roleName: string;
  
    @Prop({ type: String, unique: true })
    userName: string;
  
    @Prop({ type: Boolean })
    status: boolean;
  
    @Prop({ type: Date, default: Date.now })
    TIMESTAMP: Date;
  
    @Prop({ type: String })
    updateBy: string;
}
  
export const OptimusUserRolesSchema = SchemaFactory.createForClass(OptimusUserRoles);

OptimusUserRolesSchema.index({ userName: 1 });

