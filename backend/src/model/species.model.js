import mongoose from "mongoose";
import { User } from "./user.model.js";
const speciesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    location:{
        type:{
            type:String,
        },
        coordinates: [Number],  // [ longitude, latitude]
    },
    user : {
        type : mongoose.Schema.ObjectId,
        ref:'User'
    }
}, { timestamps: true })


speciesSchema.index({ "location": "2dsphere" });

const Species = mongoose.model("Species", speciesSchema);

export {Species};