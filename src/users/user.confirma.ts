import Config from "../products/product.config"
import { Injectable } from "@nestjs/common"
import { MailerService } from "@nestjs-modules/mailer"
import { InjectModel } from "@nestjs/mongoose"
import { VerificationCodeModel } from "./verifcationCode.schema"
import { UnauthorizedException } from "@nestjs/common"
import { Model } from "mongoose"
import { UserModel } from "./user.schema"
@Injectable()
export class UserConfirmation{
    constructor(private readonly emailService: MailerService , @InjectModel("VerificationCodeModel")private readonly verificationModel: Model<VerificationCodeModel> , @InjectModel("User") private readonly userModel:Model<UserModel> ) { }
        
    async sendEmail(id: string): Promise<{message:string, user: UserModel}  | {message:string}>{
        console.log(id);
        
        const user = await this.userModel.findById(id)
        if (!user) {
            return {message:"User not found"}
        }

        const confirmationMessage = Math.floor(Math.random() * 1000000)
        
        const verificationRecord = await this.verificationModel.create({ userId: id, code:confirmationMessage })
        await verificationRecord.save()
        await this.emailService.sendMail({
            to: Config.user,
            from: Config.user,
            subject: "Rwanda coding academy infos",
            text:  `The confirmation code of your account is ${confirmationMessage} `
        })
         
        return {message:"Confirmation code sent to your email, please open it and verify  ", user}
    }

    async verifyCode(id: string, code: number): Promise<any> {
        try {
            const verificationCode = await this.verificationModel.findOne({ userId: id, code: code })
            const user = await this.userModel.findById(id)
            if (!verificationCode) {
                throw new UnauthorizedException('Invalid code');
            }
            const username = user.username 
            return {message:  `${username} verified successfully`}
        } catch (error) {
            throw new UnauthorizedException('Invalid code');
        }
    }
}