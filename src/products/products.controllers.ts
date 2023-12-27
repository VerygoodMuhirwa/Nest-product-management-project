import { Body, Controller, Delete, Get, Post, Param, Put } from "@nestjs/common";
import { ProductsService } from "./products.services";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
@Controller("products")
export class ProductsController {
    constructor(private readonly productService: ProductsService) { }
    @Post()
        @UseGuards(AuthGuard("jwt"))
    insertProduct(@Body("productName") productName: string, @Body("productDescription") productDescription: string): any {
        return this.productService.insertProduct(productName, productDescription);
    }
    

    @Get()
                @UseGuards(AuthGuard("jwt"))
    getAllProducts() :any{
    return this.productService.getAllProducts();        
    }

    @Delete(":productId")
                @UseGuards(AuthGuard("jwt"))
    deleteProduct(@Param("productId") productId: string): any {
        return this.productService.deleteProduct(productId);
    }
   
    @Put(":productId")
                @UseGuards(AuthGuard("jwt"))
    updateProduct(@Param("productId") productId: string, @Body("productDescription") productDescription: string, @Body("productName") productName:string): any {
        return this.productService.updateProduct(productId, productDescription, productName);
    }
}       