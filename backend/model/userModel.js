import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String // TODO: ADD REQUIRED LATER
    },
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    geolocation: {
        type: String,
        required: true
    },
    loginType:{
        type:String,
        required:true
    }
},{timestamps:true});

export const User = mongoose.model("User",userSchema);