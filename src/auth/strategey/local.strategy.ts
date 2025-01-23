import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from 'passport-local' //we import passport local strategy
import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private authService:AuthService){
        super({ usernameField: "email" })
    } 
      
    async validate(email:string,password:string){
        const user= await this.authService.validate({email,password})
        if(!user){
            return new UnauthorizedException();
        }
        return  user;
    }

}