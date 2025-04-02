import express from "express";
import {
    registerUser,
    loginUser,
    logoutUser,
    deleteUser,
    refreshAccessToken,
    profile,
    googleOAuthCallback,
} from "../controllers/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import passport from "passport";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/oauth").get(
    passport.authenticate("google", {
        scope: ["email", "profile"],
    })
);

router.route("/google/oauth/callback").post(googleOAuthCallback);

// secure route
router.route("/logout").post(authenticate, logoutUser);
router.route("/delete").post(authenticate, deleteUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/profile").get(authenticate, profile);

export { router };
