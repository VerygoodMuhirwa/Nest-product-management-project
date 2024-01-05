import Config from "../products/product.config"
import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { MailerService } from "@nestjs-modules/mailer"
import { InjectModel } from "@nestjs/mongoose"
import { VerificationCodeModel } from "./verifcationCode.schema"
import { UnauthorizedException } from "@nestjs/common"
import { Model } from "mongoose"
import { UserModel } from "./user.schema"
import { ApiOkResponse } from "@nestjs/swagger"
@Injectable()
export class UserConfirmation{
    constructor(private readonly emailService: MailerService , @InjectModel("VerificationCodeModel")private readonly verificationModel: Model<VerificationCodeModel> , @InjectModel("User") private readonly userModel:Model<UserModel> ) { }
    @ApiOkResponse()
    async sendEmail(id: string): Promise<{message:string, user: UserModel}  | {message:string}>{        
        const user = await this.userModel.findById(id)
        if (!user) {
            return new HttpException({ message: "User not found" },HttpStatus.NOT_FOUND)
        }

        const confirmationMessage = Math.floor(Math.random() * 1000000)
        const verificationRecord = await this.verificationModel.create({ userId: id, code:confirmationMessage })
        await verificationRecord.save()
        await this.emailService.sendMail({
            to: user.email,
            from: Config.user,
            subject: "Rwanda coding academy infos",
            text:  `The confirmation code of your account is ${confirmationMessage} `
        })

        return new HttpException({ message:"Confirmation code sent to your email , pleaes open it and verify "  , user},  HttpStatus.OK, )
    }

    async verifyCode(id: string, code: number): Promise<any> {
        try {
            const verificationCode = await this.verificationModel.findOne({ userId: id, code: code })
            const user = await this.userModel.findById(id)
            if (!verificationCode) {
                return new HttpException("Invalid verification code", HttpStatus.BAD_REQUEST)
            }
            const username = user.username 
            return new HttpException({message:`${username} verified successfully`}, HttpStatus.OK)
        } catch (error) {        
            throw new UnauthorizedException('Invalid code');
        }
    }
}