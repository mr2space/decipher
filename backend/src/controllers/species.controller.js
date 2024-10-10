import { logger } from "../../logger.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { User } from "../model/user.model.js";
import axios from "axios";


const speciesPhotoHandler = asyncHandler(async (req, res)=>{
    if (!req.file){
        throw new ApiError(402, "file not upload successfully");
    }
    const options = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await axios.post( "https://4edc-2401-4900-5ae9-a082-fd7e-a139-403b-e4bc.ngrok-free.app/type", {
        'photo':req.file.location
    }, options);
    logger.info(response.data);
    res.status(200).json(new ApiResponse(200, response.data, "species"));
});

export {speciesPhotoHandler}