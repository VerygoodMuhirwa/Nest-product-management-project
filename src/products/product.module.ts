import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controllers";
import { ProductsService } from "./products.services";
import { ProductSchema } from "./product.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { imageSchema } from "./image.schema";
import { ImageService } from "./image.services";
@Module({
    imports: [MongooseModule.forFeature([{ name: 'products', schema: ProductSchema } ,{ name:"productImage" , schema: imageSchema }])],
    controllers: [ ProductsController],
    providers: [ProductsService, ImageService],
})  


export class ProductsModule {}