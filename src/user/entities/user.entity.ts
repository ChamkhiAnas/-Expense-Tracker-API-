import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
@Schema({autoCreate:true,timestamps: true})
export class User {

    @Prop({required:true,unique:true})
    username:string;

    @Prop({required:true,unique:true})
    email:string;

    @Prop({required:true})
    password:string;

    @Prop({})
    birthdate:Date;

}

export const UserSchema=SchemaFactory.createForClass(User)

