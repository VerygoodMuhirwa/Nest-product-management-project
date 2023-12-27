import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/product.module';
import Config from "./products/product.config"
import { MongooseModule } from "@nestjs/mongoose";
import { UsersModule } from './users/users.module';

@Module({
  imports: [ MongooseModule.forRoot(Config.mongodbUrl),ProductsModule , UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
