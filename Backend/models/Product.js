import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const ProductSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        quantity:{
            type:Number,
            required:true
        },
        category:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        image:{
            type:String,
            required:true
        }
    }
)

export default mongoose.model("Product",ProductSchema);