import { Type } from "class-transformer";
import { IsDate, IsOptional, IsString } from "class-validator";
import { IsUnique } from "src/validators/is-unique.validator";
export class CreateUserDto {
    @IsString()
    @IsUnique({ message: 'This username already exists' }) // Custom validator
    username:string;

    @IsString()
    @IsUnique({ message: 'This mail already exists' }) // Custom validator
    email:string;

    @IsString()
    password:string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    birthdate:Date;
}
