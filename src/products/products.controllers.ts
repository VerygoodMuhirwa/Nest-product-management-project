import { Body, Controller, Delete, Get, Post, Param, Put, UseInterceptors, Res, UploadedFile } from "@nestjs/common";
import { ProductsService } from "./products.services";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { FileInterceptor } from "@nestjs/platform-express"
import { diskStorage } from "multer"
import { Response } from "express";
import { Express } from "express";
import * as path from "path";
import { ApiCreatedResponse } from "@nestjs/swagger";
@Controller("products")

export class ProductsController {
    constructor(private readonly productService: ProductsService) { }

    @Post()
    @UseGuards(AuthGuard("jwt"))
         @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, cb) => {
                cb(null, `${file.originalname}`);
            },
        }),
         }))

        
    @ApiCreatedResponse({ description: "Product added successfully" })
    insertProduct(@Body("productName") productName: string, @Body("productDescription") productDescription: string, @UploadedFile() file: Express.Multer.File): any {          
         return this.productService.insertProduct(productName, file.originalname, productDescription);
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


    @Post("/upload")
   
    async uploadFile(): Promise<any> {
        return "success";
    }
    


   @Get(':filename')
    async getFile(@Param('filename') filename: string, @Res() res: Response): Promise<void> {
       const filePath = path.join(__dirname, '../../uploads', filename);
       console.log(filePath);
       res.sendFile(filePath)
    }
}

      

