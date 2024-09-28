import { User } from "../model/userModel.js";
import bcrypt from "bcryptjs";
import { Token } from "../model/tokenModel.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import { logger } from "../logger.js";
import validator from 'validator';

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

    const userExists = await User.findOne({ email }) || await User.findOne({ username });
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

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const newToken = new Token({ userId: user._id, token });
    await newToken.save();

    logger.info(`User registered: ${username}`);
    res.status(201).json({
        status: "success",
        message: "User registration successful",
        token,
        data: { username, fullname, email, phone, geolocation }
    });
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const newToken = new Token({ userId: user._id, token });
        await newToken.save();

        logger.info(`User logged in: ${username}`);
        res.json({
            status: "success",
            message: "User login successful",
            token
        });
    } else {
        logger.warn(`Invalid login attempt for Username: ${username}`);
        res.status(401).json({ status: "error", message: "Invalid username or password" });
    }
};


const testSecureControl = (req, res)=>{
    res.status(200).json({"success": 1})
}

export { registerUser, loginUser, testSecureControl };
