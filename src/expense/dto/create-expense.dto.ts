import { Type } from "class-transformer";
import { IsMongoId, IsNumber, IsString } from "class-validator";
import { Types, isValidObjectId } from "mongoose";
import { Category } from "src/category/entities/category.entity";
import { User } from "src/user/entities/user.entity";

export class CreateExpenseDto {


    @IsString()
    name:string;


    @IsNumber()
    cost:number;


    user:User;

    @IsString() 
    category:Category

}
