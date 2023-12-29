import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controllers';
import { MongooseModule } from '@nestjs/mongoose';
import {  UserSchema } from "./user.schema"
import Config from "../products/product.config"
import { AuthService } from './auth.service';
import {UserConfirmation} from "./user.confirma"
import { JwtModule } from '@nestjs/jwt';
import {JwtStrategy} from "./jwt.strategy"
import { MailerModule } from "@nestjs-modules/mailer"
import { VerificationCodeSchema } from './verifcationCode.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema },{name:"VerificationCodeModel", schema:VerificationCodeSchema}]),
      JwtModule.register({ secret: Config.secretKey, signOptions: { expiresIn: "1h" } }),
       MailerModule.forRoot({
      transport: {
        host: 'smtp.domain.com',
        port: 587,
           ignoreTLS: true,
        service:"gmail",
        secure: false,
        auth: {
          user: Config.user,
          pass: Config.pass,
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@localhost>',
      },

       }),
       
        
       
  ],
  controllers: [UsersController],
    providers: [AuthService, UserService , UserConfirmation ,  JwtStrategy ],
  exports:[ AuthService]
})
export class UsersModule {}
