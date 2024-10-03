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
        loginType:1
    });

    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const newToken = new Token({ userId: user._id,username:user.username, token });
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

        
        // TODO: make it a funtion and call for both the login and register.
        const newToken = new Token({ userId: user._id,username:user.username, token }); 
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

//TODO: REMOVE THE BELOW FUNCTION
// const googleOAuth2 = (req, res) => {
//     const scopes = [
//         'profile',
//         'email'
//     ];

//     const authorizationUrl = oauth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: scopes,
//         state: JSON.stringify(req.body)
//     });

//     res.redirect(authorizationUrl); 
// };

// const googleOAuth2Callback = async (req, res) => {
//     const { code, state } = req.body;

//     try {
//         // Exchange authorization code for access token
//         logger.info(JSON.stringify(req.body))
//         const { tokens } = await oauth2Client.getToken(code);
//         oauth2Client.setCredentials(tokens);

//         // Retrieve user information
//         const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
//         const userInfo = await oauth2.userinfo.get();

//         const { email, name } = userInfo.data;

//         // Check if user already exists
//         let user = await User.findOne({ email });

//         if (!user) {
//             // If not, register the user
//             user = new User({
//                 username: email.split('@')[0],
//                 email,
//                 fullname: name,
//                 // You can add default values for other fields like geolocation if needed
//             });

//             await user.save();
//             logger.error(`User registered via OAuth2: ${user.username}`);
//         } else {
//             logger.info(`User logged in via OAuth2: ${user.username}`);
//         }

//         // Generate and return token
//         res.status(200).json({
//             status: "success",
//             message: "OAuth2 login successful",
//             token: generateToken(user),
//             user: { username: user.username, email: user.email, fullname: user.fullname }
//         });
//     } catch (error) {
//         logger.error(`Error during OAuth2 callback: ${error.message}`);
//         res.status(500).json({ status: "error", message: "Server error" });
//     }
// };


const success_oauth = (req, res)=>{
    res.status(200).json({"success":1})
}

const failure_oauth = (req, res)=>{
    res.status(400).json({"success":0})
}

const deleteUser = async (req, res) => {
    const { user_id, password } = req.body;

    if (!user_id || !password) {
        return res.status(400).json({ status: "error", message: "Username or Email and Password are required." });
    }

    const user = await User.findOne({ $or: [{ email: user_id }, { username: user_id }] });

    if (!user) {
        logger.warn(`Delete attempt failed: No user found with identifier ${user_id}`);
        return res.status(404).json({ status: "error", message: "User not found." });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        logger.warn(`Delete attempt failed: Incorrect password for user ${user_id}`);
        return res.status(401).json({ status: "error", message: "Invalid password." });
    }

    await User.deleteOne({ _id: user._id });
    await Token.deleteMany({ userId: user._id });

    logger.info(`User deleted: ${user_id}`);
    res.status(200).json({ status: "success", message: `User ${user_id} deleted successfully.` });
};


export { registerUser, loginUser, testSecureControl, failure_oauth, success_oauth, deleteUser};
