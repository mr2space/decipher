import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../model/user.model.js";
import { logger } from "../../logger.js";
import { configDotenv } from "dotenv";
import pkg from "passport-google-oauth20";

const { Strategy: GoogleStrategy } = pkg;

configDotenv();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || "sanjeevani",
};

const jwtStrategy = new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload.id);
        if (user) {
            const tokenExists = await Token.findOne({
                userId: user._id,
                token: jwt_payload.token,
            });
            if (tokenExists) {
                return done(null, user);
            } else {
                return done(null, false, {
                    message: "Token invalid or expired",
                });
            }
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
});

const googleStrategy = new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:7000/auth/oauth/callback/",
        passReqToCallback: true,
    },
    async (request, accessToken, refreshToken, profile, done) => {

        /*
          _json: {
            sub: '105222293808499159624',
            name: 'Prince Goswami',
            given_name: 'Prince',
            family_name: 'Goswami',
            picture: 'https://lh3.googleusercontent.com/a/ACg8ocJmzq8wxbD_s-w6m5U30dT8mZBcRAq_rbtmxZR-sRLn-kDKR4_A=s96-c',
            email: 'princegoswami.space@gmail.com',
            email_verified: true
        }
        */
        try {
            const userData = profile._json;
            const username = userData.email.split('@')[0]
            let user = await User.findOne({
                $or:[{username:username}, {email:profile._json.email[0]}]
            });
            if (!user){
                const username = userData.email.split('@')[0]
                const password = `${userData.sub}${userData.email}`
                user = await User({
                    username,
                    email:userData.email,
                    fullname:userData.name,
                    gender:"male",
                    avatar: userData.picture,
                    password:password,
                    loginType:0
                })
                await user.save();
            }
            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    }
);

const googleSerialize = async (user, done) => {
    console.log("user serializer", user);

    done(null, user);
};

const googleDeserialize = async (id, done) => {
    // return done(null, user);
    console.log("user deserializer", user);
    try {
        done(null, id);
    } catch (err) {
        done(err, null);
    }
};

export { jwtStrategy, googleStrategy, googleSerialize, googleDeserialize };
