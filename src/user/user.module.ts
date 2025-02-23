import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { IsUniqueConstraint } from 'src/validators/is-unique.validator';


@Module({

  imports:[
  MongooseModule.forFeature([
    {
      name:User.name,
      schema:UserSchema
    },
  ])

],
  controllers: [UserController],
  providers: [UserService,IsUniqueConstraint],
})
export class UserModule {}
