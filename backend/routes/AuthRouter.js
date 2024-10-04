import express from "express";
import {
  registerUser,
  loginUser,
  success_oauth,
  failure_oauth,
} from "../controllers/AuthController.js";
import { protect } from "../middleware/isAuthenticated.js";
import passport from "passport";
import jwt from "jsonwebtoken";


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
  async (req, res)=>{
    const user = req.user
    console.log(user);    
    const token = jwt.sign({ id: user._id, username:username, email:email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
  
    const newToken = new Token({
      userId: user._id,
      username: user.username,
      token,
    });
    await newToken.save();
  
    logger.info(`User registered: ${username}`);
    res.status(201).json({
      status: "success",
      message: "User registration successful",
      token,
      data: { username, fullname, email, phone, geolocation },
    });
  }
);

export { router };
