import express from "express";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import {router as authRoute} from "./src/routes/auth.router.js";
import { imageUploadRouter } from "./src/routes/image.upload.router.js"; 
import { logger } from "./logger.js";
import { mongo } from "./src/config/mongoConfig.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import { googleDeserialize, googleSerialize, googleStrategy } from "./src/Utils/pasportStrategy.js";

configDotenv();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET || "sanjeevani",
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
passport.use(googleStrategy);
passport.serializeUser(googleSerialize);
passport.deserializeUser(googleDeserialize);
app.use("/auth", authRoute);
app.use("/",imageUploadRouter);
mongo();

app.listen(PORT, (err) => {
    if (err) {
        logger.error(`Error starting server: ${err}`);
    } else {
        logger.info(`Server running on port ${PORT}`);
        console.log(`Server running on port ${PORT}`);
    }
});
