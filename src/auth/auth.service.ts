import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthPayLoadDto } from './dto/AuthPayloadDto.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private userModel:Model<User>,
    private jwtService:JwtService
  ){}

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  async compareWithHashString(plainStr: string, hashedStr: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(plainStr, hashedStr);
    return isMatch;
  }

  async validate({email,password}:AuthPayLoadDto){
    const user=await this.userModel.findOne({email:email})

    if(!user){
      throw new HttpException(`No user found with this mail ${email}`,HttpStatus.NOT_FOUND)
    }
    const isLogged=await this.compareWithHashString(password,user.password)
    if(!isLogged){
      throw new HttpException(`Password is wrong`,HttpStatus.FORBIDDEN)
    }
    const {username,email:userEmail}=user;
    return await this.jwtService.signAsync({username,userEmail});
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
