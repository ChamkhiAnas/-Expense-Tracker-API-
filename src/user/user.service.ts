import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model } from 'mongoose';
import { ValidateUserDto } from './dto/validate-user.dto';

@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel:Model<User> ) {}

  private async hashString(str: string): Promise<string> {
    const saltRounds = 10; // Define the cost factor for hashing
    return await bcrypt.hash(str, saltRounds);
  }

  async create(createUserDto: CreateUserDto) {
    const {username,email,password,}=createUserDto
    const hashed_password=await this.hashString(password);
    const user = await new this.userModel({username,email,"password":hashed_password})
    return user.save()
  }

  async validate(validateUserDto:ValidateUserDto){
    

  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
