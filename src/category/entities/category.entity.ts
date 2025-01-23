import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({autoCreate:true,timestamps:true})
export class Category {
    @Prop({type:String})
    name:string;
}

export const CategorySchema=SchemaFactory.createForClass(Category)
