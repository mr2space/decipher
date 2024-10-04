import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import { logger } from "../../logger.js";
import { ApiError } from "../Utils/ApiError.js";

export const authenticate = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id).select("-password");
            next();
        } catch (error) {
            throw new ApiError(401, "user is not authorized");
        }
    }
};
