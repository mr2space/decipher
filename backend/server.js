import express from "express";
import bodyParser from "body-parser";
import { configDotenv } from "dotenv";
import router from "./routes/AuthRouter.js";
import { logger } from "./logger.js";
import { mongo } from "./config/mongoConfig.js";
import passport from "passport";
import {jwtStrategy} from "./Utils/pasportStrategy.js";
import session from "express-session";
import cookieParser from "cookie-parser";

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
app.use(passport.session())
passport.use(jwtStrategy); 

app.use("/auth", router);
mongo();

app.listen(PORT, (err) => {
    if (err) {
        logger.error(`Error starting server: ${err}`);
    } else {
        logger.info(`Server running on port ${PORT}`);
        console.log(`Server running on port ${PORT}`);
    }
});
