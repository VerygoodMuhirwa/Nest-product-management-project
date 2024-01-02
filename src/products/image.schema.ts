import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { ProductModel } from "./product.schema";
import { Document } from "mongoose";
@Schema()
export class ImageModel extends Document{
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref:"products" })
    productId:string     
    @Prop()
    fileName: string
}


export const imageSchema = SchemaFactory.createForClass(ImageModel)
