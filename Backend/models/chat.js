import mongoose from "mongoose";
import { Schema } from "mongoose";
import messageSchema from './message.js';

const chatSchema = mongoose.Schema({
    users:[
        {
          type:mongoose.Schema.Types.ObjectId,
          ref:'User',
          required:true
        }
    ],
    messages:[messageSchema]
});

export default mongoose.model("Chat", chatSchema);