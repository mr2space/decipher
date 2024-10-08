import express from "express";
import {  searchController, speciesLocation } from "../controllers/search.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
const router = express.Router();

router.route("").post(authenticate, searchController);
router.route("/species").get(authenticate, speciesLocation);
export {router};