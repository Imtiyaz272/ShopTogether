import mongoose from "mongoose";
import { Schema } from "mongoose";
import User from "./user.js";
const messageSchema = mongoose.Schema(
    {
        sender:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        message:{
            type:String,
            required:true
        }
    }
);

export default messageSchema;