import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

export type productType= HydratedDocument<ProductModel>
@Schema()
export class ProductModel extends Document {
  @Prop()
  productName: string;

  @Prop()
  productDescription: string;
}

export const ProductSchema = SchemaFactory.createForClass(ProductModel);