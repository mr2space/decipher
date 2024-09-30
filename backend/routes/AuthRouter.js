import express from "express";
import {
  registerUser,
  loginUser,
  success_oauth,
  failure_oauth,
} from "../controllers/AuthController.js";
import { protect } from "../middleware/isAuthenticated.js";
import passport from "passport";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/profile", protect, (req, res) => {
  res.json({
    status: "success",
    message: "Profile accessed",
    data: req.user,
  });
});

router.get(
  "/oauth",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
); // This is for OAuth registration

router.get(
  "/oauth/callback",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    failureRedirect: "/auth/oauth/failure",
  }),
  (req, res)=>{res.send("hello")}
);

export { router };
