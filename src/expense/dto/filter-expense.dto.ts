import { Type } from "class-transformer"
import { IsDate } from "class-validator"

export class FilterExpenseDto {


    @IsDate()
    @Type(()=> Date)
    startDate:Date

    @Type(()=> Date)
    @IsDate()
    endDate:Date
    
}