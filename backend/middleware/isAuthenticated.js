import jwt from "jsonwebtoken";
import { User } from "../model/userModel.js";
import { logger } from "../logger.js";

export const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    }

    // if (!token) {
    //     return res.status(401).json({ message: "Not authorized, no token" });
    // }
};
