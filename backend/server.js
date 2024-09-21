import bodyParser from "body-parser";
import express from "express";
import { configDotenv } from "dotenv";
import { logger } from "./logger.js";


configDotenv(".env")

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/", ()=>{} );
app.use("/auth", ()=>{} );


app.listen(8080, (err)=>{
    console.log("server started: 8080");
})