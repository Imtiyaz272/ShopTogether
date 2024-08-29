import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const cartItemSchema = mongoose.Schema(
    {
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Product'
        },
        price:{
            type:Number,
            required:true
        },
        quantity:{
            type:Number,
            required:true,
            default:1
        },
        image:{
            type:String,
            required:true,
             ref:'Product'
        },
        name:{
            type:String,
            required:true,
             ref:'Product'
        }
    }
);

export default cartItemSchema;