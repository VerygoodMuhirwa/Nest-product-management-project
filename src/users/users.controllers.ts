// app.controller.ts
import { Controller, Get, Post, Body,Request , Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {UserConfirmation} from "./user.confirma"
import { UserService } from './users.service';
@Controller('auth')
export class UsersController{
    constructor(
      private readonly authService: AuthService,
    ) { }

  @Post('login')
  async login(@Body() body: { email: string; password: string }): Promise<{ accessToken: string } | {message:string}> {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.loginUser(user);
  }

  @Post('register')
  async register(@Body() body: { username: string; password: string , email:string}): Promise<any> {
    return this.authService.register(body);
  }

   @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Request() req): Promise<any> {
       const token = req.headers.authorization.split(' ')[1];
    return this.authService.getProfile(token);
  }

  @Get("verifyUser/:verificationCode") 
  async verifyUser(@Param("verificationCode") verificationCode: number , @Body("userId") userId: string): Promise<any>{
    return this.authService.verifyCode(userId, verificationCode)
  }
}


