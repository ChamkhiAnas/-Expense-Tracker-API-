import {  IsString } from "class-validator";
export class AuthPayLoadDto {

    @IsString()
    email:string;

    @IsString()
    password:string;
}
