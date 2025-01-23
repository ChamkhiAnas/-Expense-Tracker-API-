import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './strategey/local.strategy';
import { JwtStrategy } from './strategey/JwtStrategy.strategy';

@Module({
  imports:[
    JwtModule.registerAsync({
      imports:[ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const secretKey = configService.get('JWT_SECRET_KEY');
        const expiration = configService.get('JWT_EXPIRATION');  
        return { 
          global: true,
          secret: secretKey,
          signOptions: { expiresIn: expiration },
        };
      },
 
    inject:[ConfigService]
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forFeature([
      {
        name:User.name,
        schema:UserSchema
      },
    ])
  
  ],
  controllers: [AuthController],
  providers: [AuthService,LocalStrategy,JwtStrategy],
})
export class AuthModule {}
