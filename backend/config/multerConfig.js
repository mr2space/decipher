import multer from "multer";

const destination = "";

const storage = () => {};

const checkFileType = () => {};

const SingleUploader = multer({}).single();

const MultiUploader =  multer({}).array();

export {SingleUploader, MultiUploader, destination}