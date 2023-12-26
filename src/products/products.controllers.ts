import { Body, Controller, Get, Post } from "@nestjs/common";
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
    
   
}       