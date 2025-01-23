import { Injectable, Type } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Category } from "src/category/entities/category.entity";
import { User } from "src/user/entities/user.entity";

@Schema({autoCreate:true,timestamps:true})
export class Expense {
    @Prop({maxlength:650,type:String,required:true})
    name:string;

    @Prop({type:Number,required:true})
    cost:number;

    @Prop({type:Types.ObjectId,ref:"User",required:true})
    user:Types.ObjectId

    @Prop({type:Types.ObjectId,ref:"Category",required:true})
    category:Types.ObjectId
}


export const ExpenseSchema=SchemaFactory.createForClass(Expense)