import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from 'src/category/entities/category.entity';
import { Expense } from './entities/expense.entity';
import { Model, isValidObjectId } from 'mongoose';
import { FilterExpenseDto } from './dto/filter-expense.dto';

@Injectable()
export class ExpenseService {
  constructor(
    @InjectModel(Category.name) private categoryModel:Model<Category>,
    @InjectModel(Expense.name) private ExpenseModel:Model<Expense>,
){}

  async create(userId,createExpenseDto: CreateExpenseDto) {
    const {name,cost,category}=createExpenseDto
    let category_id
    
    const categoryDocument = await this.categoryModel.findOneAndUpdate(
      { name: category },
      { $setOnInsert: { name: category } },
      { new: true, upsert: true }
    );


    const expanse=await new this.ExpenseModel({
      name,
      cost,
      "category":categoryDocument._id,
      "user":userId
    })

    await expanse.save()

    return await expanse.populate({
      path: 'category', 
      select: 'name -_id',
    });
        
  }
  
  async findByDate(userId, filterExpenseDto:FilterExpenseDto){

    const {startDate,endDate}=filterExpenseDto
    
    const filteredExpenses=await this.ExpenseModel.find({
      createdAt:{
          $gte: new Date(startDate), // Start of the range
          $lte: new Date(endDate),   // End of the range
      },
      user:userId
    })


    return filteredExpenses;

  }

  async findAll(userId) {

    const user_expenses=await this.ExpenseModel.find({
      user:userId
    }).populate({
      path:"category",
      select:"name -_id"
    }).exec()
    
    return user_expenses;
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  async update(userId,id: string, updateExpenseDto: UpdateExpenseDto) {

    const {name,cost,category:updateCategory}= updateExpenseDto

    const current_expense=await this.ExpenseModel.findById(id)

    if(!current_expense){
      throw new HttpException(`No expanse found with this is ${id}`,HttpStatus.NOT_FOUND)
    }

    let category_id=await current_expense.category

    if(updateCategory){
      const category_document=await this.categoryModel.findOneAndUpdate(
        {"name":updateCategory},
        {$setOnInsert: {name:updateCategory}},
        {new:true,upsert:true}
      )
      category_id=category_document._id
    }

    const expense_document=await this.ExpenseModel.findOneAndUpdate(
      {"_id":id},
      {$set: {name,cost,user:userId,category:category_id}},
      {new:true,runValidators: true}
    )

    if(!expense_document){
      throw new HttpException('error while trying to update',HttpStatus.BAD_REQUEST)
    }

    return expense_document



    
  }


  async remove(userId,id) {

    if (!isValidObjectId(id)) {
      throw new BadRequestException(`Invalid ID format: ${id}`);
    }

    const removed_expense=await this.ExpenseModel.findOneAndDelete({  
      _id: id
    }).exec()


    if (!removed_expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }

    return removed_expense;
  }
}
