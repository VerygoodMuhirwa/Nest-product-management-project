import { Body, Controller, Delete, Get, Post, Param, Put } from "@nestjs/common";
import { ProductsService } from "./products.services";
@Controller("products")
export class ProductsController {
    constructor(private readonly productService: ProductsService) { }
    @Post()
    insertProduct(@Body("productName") productName: string, @Body("productDescription") productDescription: string): any {
        return this.productService.insertProduct(productName, productDescription);
    }
    

    @Get()
    getAllProducts() :any{
    return this.productService.getAllProducts();        
    }

    @Delete(":productId")
    deleteProduct(@Param("productId") productId: string): any {
        return this.productService.deleteProduct(productId);
    }
   
    @Put(":productId")
    updateProduct(@Param("productId") productId: string, @Body("productDescription") productDescription: string, @Body("productName") productName:string): any {
        return this.productService.updateProduct(productId, productDescription, productName);
    }
}       