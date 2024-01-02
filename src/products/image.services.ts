
import { Inject, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ImageModel } from "./image.schema";

@Injectable()

export class ImageService{
    constructor(@InjectModel("productImage") private readonly productImageModel: Model<ImageModel>) { }
    async create(fileName: Object, productId: string): Promise<any> {
        const createdImage = new this.productImageModel({fileName:fileName, productId});
        const storedCredentials = createdImage.save();
        return (await storedCredentials).populate("productId")
    }

}