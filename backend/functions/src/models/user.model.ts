import mongoose from "mongoose";
import { IUser } from "../interface/user.interface";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true, 
    },
    TeamTowin: {
        type: String,
        trim: true,
    },
    Points: {
        type: Number,
        default: 0,
    },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false,
    }
},
 {
    timestamps: true,   
 }

);

const User = mongoose.model<IUser>("User", userSchema)
export default User;