import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const UserSchema = mongoose.Schema(
    {
        firstName:{
            type: String,
            required:true
        },
        lastName:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true,
            unique:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        profileImage:{
            type:String,
            required:false,
            default:"https://uxwing.com/wp-content/themes/uxwing/download/peoples-avatars/default-profile-picture-grey-female-icon.png"
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
        roles:{
            type: [Schema.Types.ObjectId],
            required:true,
            ref:"Role"
        },
        sharedCarts: [
            { 
                type: Schema.Types.ObjectId, 
                required:false,
                ref: "Cart" 
            }]
    },
    {
        timestamps:true
    }
)

export default mongoose.model("User",UserSchema);