import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ProductModel} from "./product.schema"

import { Model } from "mongoose";

@Injectable()
export class ProductsService {
  constructor(@InjectModel("products") private readonly productModel: Model<ProductModel>) { }

  async insertProduct(productName: string, productDescription: string): Promise<any> {
    const newProduct = new this.productModel({ productName, productDescription })
    const savedProduct = await newProduct.save();
    return { ...savedProduct.toJSON() }
  }
  async getAllProducts(): Promise<any> {
    try {
      const allProducts = await this.productModel.find();
      const transformedProducts = allProducts.map(product => ({
        _id: product._id,
        productName: product.productName,
        productDescription: product.productDescription,
      }));
      return transformedProducts;
    } catch (error) {
      console.error('Error fetching products:', error.message);
      throw new Error('Failed to fetch products');
    }
  }

  async deleteProduct(productId: string): Promise<any> {
    try {
      await this.productModel.deleteOne({ _id: productId })
      return { message: "Product deleted successfully" };
    } catch (error) {
      console.error('Error deleting products:', error.message);
      throw new Error('Failed to delete products');
    }

  }
  async updateProduct(productId: string, productDescription: string , productName:string): Promise < any > {
    const updatedProduct = await this.productModel.findOneAndUpdate({ _id: productId }, { productDescription, productName }, { new: true })
    await updatedProduct.save();
    return { message: "Product updated successfully",updatedProduct}

    }
}