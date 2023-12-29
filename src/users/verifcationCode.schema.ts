
import { Prop, SchemaFactory , Schema   } from "@nestjs/mongoose";
import { Document } from "mongoose";
import mongoose from "mongoose";
@Schema()
export class VerificationCodeModel extends Document{
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
    userId: mongoose.Schema.Types.ObjectId;
    @Prop({ required: true })
    code: number;
    @Prop({ type: Date, default: Date.now(), expires: "1h" })
    createdAt: Date;
}

export const VerificationCodeSchema = SchemaFactory.createForClass(VerificationCodeModel)