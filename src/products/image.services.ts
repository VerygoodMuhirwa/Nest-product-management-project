
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ImageModel } from "./image.schema";

@Injectable()

export class ImageService{
    constructor(@InjectModel("productImage") private readonly productImageModel: Model<ImageModel>) { }
    async create(fileName: Object, productId: string): Promise<any> {
        const createdImage =await  new this.productImageModel({fileName:fileName, productId});
        const storedCredentials = await createdImage.save();
        const productImageUrl = `http://localhost:3000/${(await storedCredentials).fileName}`
        const populatedCredentials = await storedCredentials.populate("productId")        
        return new HttpException( {
            productImageUrl,
            populatedCredentials
        },HttpStatus.OK)

    }


}