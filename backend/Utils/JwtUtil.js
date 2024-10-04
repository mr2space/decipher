import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    return jwt.sign({id:user._id, username:user.username, email:user.email},process.env.JWT_SECRET || "sanjeevani",{
        expiresIn: "365d",
    });
};