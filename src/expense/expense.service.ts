import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from 'src/category/entities/category.entity';
import { Expense } from './entities/expense.entity';
import { Model } from 'mongoose';

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

  findAll() {
    return `This action returns all expense`;
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


  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
