// app.controller.ts
import { Controller, Get, Post, Body,Request , Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {UserConfirmation} from "./user.confirma"
import { UserService } from './users.service';
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
@Controller('auth')
export class UsersController{
    constructor(
      private readonly authService: AuthService,
    ) { }

  @ApiOkResponse({ description: "User logged in successfully" })
  @ApiNotFoundResponse({description:"Invalid email or password"})
  @Post('login')
  async login(@Body() body: { email: string; password: string }): Promise<{ accessToken: string } | {message:string}> {
    const user = await this.authService.validateUser(body.email, body.password);
    return this.authService.loginUser(user);
  }

  @ApiCreatedResponse({ description: "User created successfully" })
  @ApiConflictResponse({ description: "The user with that email already exists" })
  @Post('register')
  async register(@Body() body: { username: string; password: string , email:string}): Promise<any> {
    return this.authService.register(body);
  }
@ApiUnauthorizedResponse({description:"Invalid token"})
  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  async getProfile(@Request() req): Promise<any> {
       const token = req.headers.authorization.split(' ')[1];
    return this.authService.getProfile(token);
  }
    
  @ApiOkResponse({ description: "User verified successfully" })
  @ApiNotFoundResponse({description:"Invalid confirmaton code"})
  @Get("verifyUser/:verificationCode") 
  async verifyUser(@Param("verificationCode") verificationCode: number , @Body("userId") userId: string): Promise<any>{
    return this.authService.verifyCode(userId, verificationCode)
  }
}


