import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Expense,ExpenseSchema } from './entities/expense.entity';
import { User,UserSchema } from 'src/user/entities/user.entity';
import { Category,CategorySchema } from 'src/category/entities/category.entity';
import { CategoryService } from 'src/category/category.service';
import { UserService } from 'src/user/user.service';

@Module({
  imports:[
    MongooseModule.forFeature([
    { name: Expense.name, schema: ExpenseSchema},
    { name: User.name, schema: UserSchema},
    { name: Category.name, schema: CategorySchema}
  ]),
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService,CategoryService,UserService],
})
export class ExpenseModule {}
