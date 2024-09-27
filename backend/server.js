import bodyParser from "body-parser";
import express from "express";
import { configDotenv } from "dotenv";
import router from "./routes/AuthRouter.js"
import { logger } from "./logger.js";
import { mongo } from "./config/mongoConfig.js";


configDotenv();

const app = express();
const PORT=process.env.PORT||5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/user", router);
mongo();
app.listen(PORT, (err)=>{
    logger.info(`Server running on port ${PORT}`);
    console.log(`Server running on port ${PORT}`);
})