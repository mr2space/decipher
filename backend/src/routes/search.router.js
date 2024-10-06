import express from "express";
import {  searchController } from "../controllers/search.controller.js";
const router = express.Router();

router.route("").post(searchController);

export {router};