import express from "express";
import { upload } from "../config/multerConfig.js";
import {speciesPhotoHandler} from "../controllers/species.controller.js"
const router = express.Router();
import { authenticate } from "../middleware/auth.middleware.js";

router.route("").post(authenticate, upload.single('photo'), speciesPhotoHandler);
export { router };