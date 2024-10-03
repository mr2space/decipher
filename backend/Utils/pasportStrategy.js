import passport from 'passport'; 
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { User } from "../model/userModel.js";
import { Token } from "../model/tokenModel.js";
import {logger} from '../logger.js';
import { configDotenv } from "dotenv"; 
import pkg from 'passport-google-oauth20'; 
const { Strategy: GoogleStrategy } = pkg;

configDotenv();

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

const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:7000/auth/oauth/callback/",
    passReqToCallback: true,
  },
  async (request, accessToken, refreshToken, profile, done) => {
    try {
      logger.info(JSON.stringify(profile))
      let user = await User.findOne({ username: profile.id });
      if (!user) {
        user = new User({
            username: profile.id,
            fullname: profile.displayName,
            email: profile.emails[0].value,
            phone:"N/A",
            geolocation:"N/A",
            loginType:0
        });
        await user.save();
      }
      return done(null, profile);
    } catch (err) {
      return done(err, null);
    }
  }
);



const googleSerialize = async (user, done) => {
    done(null, user);
  };

const googleDeserialize =   async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, id);
    } catch (err) {
      done(err, null);
    }
  }

export { jwtStrategy, googleStrategy, googleSerialize,  googleDeserialize};
