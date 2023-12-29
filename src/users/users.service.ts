import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose"
import { Model } from "mongoose"
import {UserModel} from "./user.schema"
import { UserConfirmation } from './user.confirma';

@Injectable()

export class UserService{
  constructor(@InjectModel("User") private readonly userModel: Model<UserModel>,
    private readonly UserConfirmation: UserConfirmation) { }
    async findOne(email: string): Promise<any> {
      return this.userModel.findOne({email})
    }

   
   
}
