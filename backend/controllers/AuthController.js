import { User } from "../model/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../Utils/JwtUtil.js"
import validator from "validator";
import { logger } from "../logger.js";

const registerUser = async (req, res) => {
    const { username, password, fullname, email, phone, geolocation } = req.body;

    if (!username || !password || !fullname || !email || !phone || !geolocation) {
        return res.status(400).json({ status: "error", message: "All fields are required." });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ status: "error", message: "Invalid email format." });
    }

    if (!validator.isMobilePhone(phone, 'any')) {
        return res.status(400).json({ status: "error", message: "Invalid phone number format." });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        logger.warn("User already exists");
        return res.status(400).json({ status: "error", message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        username,
        password: hashedPassword,
        fullname,
        email,
        phone,
        geolocation,
    });

    await user.save();
    logger.info(`User registered: ${username}`);
    res.status(201).json({
        status: "success",
        message: "User registration successful",
        token: generateToken(user),
        data: { username, fullname, email, phone, geolocation }
    });
};


const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
        logger.info(`User logged in: ${username}`);
        res.json({
            status: "success",
            message: "User login successful",
            token: generateToken(user)
        });
    } else {
        if (!user) {
            logger.warn(`User does not exist: ${username}`);
            return res.status(404).json({ status: "error", message: "User does not exist" });
        }
        logger.warn(`Login has failed for Username: ${username}`);
        res.status(401).json({ status: "error", message: "Invalid username or password" });
    }
};

export {registerUser, loginUser};