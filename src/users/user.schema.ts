import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';

    export type productType= HydratedDocument<UserModel>

@Schema()
 export class UserModel extends Document{
    @Prop()
    username: string
    @Prop()
    email: string
    @Prop()
    password:string
}


export const UserSchema = SchemaFactory.createForClass(UserModel)