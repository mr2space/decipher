import express from "express";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("static"));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//Login API
app.post("/user/login", (req, res) => {
  let data = req.body;
  res.send(data);
});

//Home API
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/home.html"));
});

//Random GPS location API
app.post("/user/search", (req, res) => {
  const searchQuery = req.body.query; 

  if (!searchQuery) {
    return res.status(400).json({ error: "Search query is required" });
  }

  const randomLat = (Math.random() * 180 - 90).toFixed(6);
  const randomLng = (Math.random() * 360 - 180).toFixed(6); 

  res.json({ 
    searchQuery: searchQuery,
    latitude: randomLat,
    longitude: randomLng 
  });
});


//Static map web API
app.get("/user/map", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/map.html"));
});

//API to take a photo input and generate a random number as JSON output
app.post("/user/upload", upload.single("photo"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const randomNumber = Math.floor(Math.random() * 1000000); 
  res.json({ filename: req.file.originalname, randomNumber: randomNumber });
});


app.listen(3000, () => {
  console.log("Running on 3000");
});
