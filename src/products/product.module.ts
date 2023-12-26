import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controllers";
import { ProductsService } from "./products.services";
import { ProductSchema } from "./product.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [MongooseModule.forFeature([{ name: 'products', schema: ProductSchema }])],
    controllers: [ ProductsController],
    providers: [ProductsService, ],
    
})


export class ProductsModule {}