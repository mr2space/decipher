import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../model/userModel.js";
import { Token } from "../model/tokenModel.js";

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || "sanjeevani"
};

const jwtStrategy = new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload.id);
        if (user) {
            const tokenExists = await Token.findOne({ userId: user._id, token: jwt_payload.token });
            if (tokenExists) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Token invalid or expired" });
            }
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
});

export {jwtStrategy};
