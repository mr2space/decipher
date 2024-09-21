import mongoose from "mongoose";
import { mongo } from "../config/mongoConfig";


const user = new mongoose.model();

export { user };