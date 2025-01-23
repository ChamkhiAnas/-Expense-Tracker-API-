import { Injectable } from '@nestjs/common';
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
    const current_category=await this.categoryModel.findOne({"name":category})

    if(!current_category){
      const new_category=await new this.categoryModel({"name":category})
      await new_category.save()
      category_id=new_category._id
    }
    else{
      category_id=current_category._id
    }

    const expanse=await new this.ExpenseModel({
      name,
      cost,
      "category":category_id,
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

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  remove(id: number) {
    return `This action removes a #${id} expense`;
  }
}
