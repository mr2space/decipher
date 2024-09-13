import express from "express";
import bodyParser from "body-parser";
import path from "path"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('static'));

app.post("/user/login", (req, res)=>{
    let data = req.body;
    res.send(data);
})

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "templates/home.html"));
})


app.listen(3000, ()=>{
    console.log("Running on 3000");
})
