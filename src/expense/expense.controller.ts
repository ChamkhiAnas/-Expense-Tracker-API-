import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { FilterExpenseDto } from './dto/filter-expense.dto';

@Controller('expense')
export class ExpenseController {
  constructor(
    
    private readonly expenseService: ExpenseService,

  ) {}


  @Post()
  @UseGuards(JwtGuard)
  create(@Request() req,@Body() createExpenseDto: CreateExpenseDto) {

    const userId = req.user.id; 
    return this.expenseService.create(userId,createExpenseDto);
  }


  @Post('filter-by-date')
  @UseGuards(JwtGuard)
  GetWithDateFilters(@Request() req,@Body() filterExpenseDto: FilterExpenseDto) {
    const userId = req.user.id; 
    return this.expenseService.findByDate(userId,filterExpenseDto)
  }



  @UseGuards(JwtGuard)
  @Get()
  findAll(@Request() req) {
    const userId = req.user.id; 
    return this.expenseService.findAll(userId);
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseService.findOne(+id);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  update(@Request() req,@Param('id') id: string, @Body() updateExpenseDto: UpdateExpenseDto) {

    const userId = req.user.id; 
    return this.expenseService.update(userId,id, updateExpenseDto);
  }


  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Request() req,@Param('id') id: string) {
    const userId = req.user.id; 
    return this.expenseService.remove(userId,id);
  }
}
