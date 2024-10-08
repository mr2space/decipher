import express from "express";
import {  searchController, insertSampleLocation, allLocation, speciesLocation } from "../controllers/search.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
const router = express.Router();

router.route("").post(authenticate, insertSampleLocation);
router.route("/all").get(authenticate, allLocation);
router.route("/search").get(authenticate, speciesLocation);

export {router};