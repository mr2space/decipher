import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
import { logger } from "../../logger.js";
import { ApiError } from "../Utils/ApiError.js";
import { asyncHandler } from "../Utils/asyncHandler.js";

export const authenticate = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.headers.authorization?.replace("Bearer ", "");
        
        if (!token){
            throw new ApiError(401, "Unauthorized access");
        }
    
        const decode = jwt.decode(token, process.env.ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decode?._id).select("-password -loginType -refreshToken");
    
        if (!user){
            throw new ApiError(401, "Invalid Access Token");
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token")
    }

});
