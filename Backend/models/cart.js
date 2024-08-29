import mongoose from "mongoose";
import { Schema } from "mongoose";
import CartItem from "./cartItem.js";
import Chat from "./chat.js";

const CartSchema = mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'User'
        },
        items:[CartItem],
        totalPrice:{
            type:Number,
            required:true,
            default:0
        },
        totalQuantity:{
            type:Number,
            required:true,
            default:0
        },
        cartName: {
            type: String,
            required: false 
        },
        cartCode: {
            type: String,
            required: false,
            unique: true
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required:false
            }
        ],
        chatId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Chat',
            required:false
        }
    },
    {timestamps:true}
);

export default mongoose.model('Cart', CartSchema);