import express from "express";
import { upload } from "../config/multerConfig.js";
import {speciesPhotoHandler} from "../controllers/species.controller.js"
const router = express.Router();

router.route("").post(upload.single('photo'), speciesPhotoHandler);
export { router };