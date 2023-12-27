import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UsersController } from './users.controllers';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from "./user.schema"
import Config from "../products/product.config"
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    JwtModule.register({ secret: Config.secretKey, signOptions: { expiresIn: "1h" } })
  ],
  controllers: [UsersController],
    providers: [AuthService, UserService, JwtStrategy ],
  exports:[ AuthService]
})
export class UsersModule {}
