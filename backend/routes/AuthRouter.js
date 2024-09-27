import express from "express"; 
import { registerUser, loginUser } from "../controllers/AuthController.js";

const router = express.Router();

router.get("/register", (req, res) => res.send("Register Page"));
router.post("/register", registerUser);
router.get("/login", (req, res) => res.send("Login Page"));
router.post("/login", loginUser);

export default router;