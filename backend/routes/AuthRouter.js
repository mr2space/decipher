import express from "express";
import { registerUser, loginUser } from "../controllers/AuthController.js";
import { protect } from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, (req, res) => {
    res.json({
        status: "success",
        message: "Profile accessed",
        data: req.user
    });
});

export default router;
