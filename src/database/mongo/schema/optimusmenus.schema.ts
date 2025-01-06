import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";

export type OptimusMenusDocument = OptimusMenus & Document;

@Schema()
export class OptimusMenus {
    @Prop({ type: String })
    idItem: string;
  
    @Prop({ type: String, unique: true })
    menuName: string;
  
    @Prop({ type: String })
    priority: string;
  
    @Prop({ type: String })
    menuLink: string;
  
    @Prop({ type: Object })
    buttonInfo: object;
  
    @Prop({ type: Boolean })
    status: boolean;
  
    @Prop({ type: Date, default: Date.now })
    TIMESTAMP: Date;
  
    @Prop({ type: String })
    updateBy: string;
}
  
export const OptimusMenusSchema = SchemaFactory.createForClass(OptimusMenus);