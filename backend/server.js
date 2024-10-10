import express from "express";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import { router as authRoute } from "./src/routes/auth.router.js";
import { router as searchRoute } from "./src/routes/search.router.js";
import { router as devRouter } from "./src/routes/dev.router.js";
import {router as imageUploadRouter } from "./src/routes/image.upload.router.js"
import { logger } from "./logger.js";
import { mongo } from "./src/config/mongoConfig.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import {
    googleDeserialize,
    googleSerialize,
    googleStrategy,
} from "./src/Utils/pasportStrategy.js";
import { morganLogger } from "./src/middleware/morgan.middleware.js";

configDotenv();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
    session({
        secret: process.env.SESSION_SECRET || "sanjeevani",
        resave: false,
        saveUninitialized: true,
    })
);

app.use(morganLogger);
app.use(passport.initialize());
passport.use(googleStrategy);
passport.serializeUser(googleSerialize);
passport.deserializeUser(googleDeserialize);
app.use("/auth", authRoute);
app.use("/search", searchRoute);
app.use("/upload", imageUploadRouter)
app.use("/dev", devRouter);
mongo();
app.listen(PORT, (err) => {
    if (err) {
        logger.error(`Error starting server: ${err}`);
    } else {
        logger.info(`Server running on port ${PORT}`);
        console.log(`Server running on port ${PORT}`);
    }
});
