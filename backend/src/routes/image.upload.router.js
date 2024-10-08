import express from "express";
import { upload } from "../config/multerConfig.js";
const imageUploadRouter = express.Router();

imageUploadRouter.post('/upload', upload.single('photo'), (req, res) => {
    if (!req.file) {
      return res.status(400).send({ error: 'Please upload a file!' });
    }
    res.status(200).json({
      message: 'File uploaded successfully',
      url: req.file.location 
    });
  });

export { imageUploadRouter };
