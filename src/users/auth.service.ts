import { Injectable } from '@nestjs/common';
import { UserService } from './users.service';
import * as bcrypt from 'bcrypt'
import * as jwt from "jsonwebtoken"
import Config from "../products/product.config"
import { UserModel } from './user.schema';
import { Model } from "mongoose"
import { UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserConfirmation } from './user.confirma';
@Injectable()
export class AuthService{
  constructor(
    private readonly userService: UserService,
    @InjectModel("User") private readonly userModel: Model<UserModel>,
    private readonly UserConfirmation:UserConfirmation
) { }
    
    async validateUser(email: string, password: string): Promise<any>{
        const user = await this.userService.findOne(email)        
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user
            return result;
        }

        return null;
    }

  
   async create(user: Partial<UserModel>) : Promise<{message:string, user:UserModel}>{
        const newUser = await this.userModel.create(user)
      const savedUser = await newUser.save()
      return this.UserConfirmation.sendEmail(savedUser._id)
    }    
  async verifyCode(userId: string, code: number): Promise<any> {
  return this.UserConfirmation.verifyCode(userId, code)
}

    async loginUser(user: any): Promise<{message:string, accessToken: string } | {message:string}>{
        if (!user) {
                       return {message:"Invalid email or password"}

        } else {
             console.log(user);
             
             const payload = { username: user._doc.username, _id: user._doc._id }
            return {
                message:"Logged in successfully",
                accessToken: await jwt.sign(payload, Config.secretKey)
            }
        }
    }

  async register(user: Partial<UserModel>): Promise<{ message: string, user: UserModel } |  {message:string}>{
    const userExists = await this.userService.findOne(user.email)
    if (userExists) {
      return {message:"The user with that email already exists"}
    }
        const harshedPassword = await bcrypt.hash(user.password, 10)    
        return this.create({...user, password:harshedPassword})
    }

     verifyToken(token: string): any {
    try {
    return jwt.verify(token, Config.secretKey);
    } catch (error) {
      return null;
    }
    }
    

      async getUserProfile(userId: string): Promise<any> {
        try {
            const userProfile = await this.userModel.findById(userId).select("-password");
            return userProfile;
        } catch (error) {
            return null;
        }
    }

    async getProfile(token: string): Promise<any> {
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

        try {
            const decodedToken = this.verifyToken(token);
      if (!decodedToken) {
        throw new UnauthorizedException('Invalid token');
      }

            const now = Math.floor(Date.now() / 1000);

if (decodedToken.exp && decodedToken.exp < now) {
    throw new UnauthorizedException('Token has expired');
    
            }
            
            
      const userId = decodedToken._id;

      if (!userId) {
        throw new UnauthorizedException('User not found');
      }

      const userProfile = await this.getUserProfile(userId);

      if (!userProfile) {
        throw new UnauthorizedException('User not found');
      }

      return userProfile;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
    }
    
     
}
