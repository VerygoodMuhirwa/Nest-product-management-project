import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import {UserModel} from "./user.schema"
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()

export class UserService{
    constructor(@InjectModel("User") private readonly userModel: Model<UserModel>) { }
    async findOne(email: string): Promise<any> {
      return this.userModel.findOne({email})
    }

    async create(user: Partial<UserModel>) : Promise<UserModel>{
        const newUser = await this.userModel.create(user)
        const savedUser = await newUser.save()
        return savedUser
    }    
}
