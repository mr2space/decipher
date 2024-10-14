import { logger } from "../../logger.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { User } from "../model/user.model.js";
import { Species } from "../model/species.model.js";
import axios from "axios";

const saveLocation = async (position, name, user_id) =>{
    if (
        (position[0] < -180 && position[0] > 180) ||
        (position[1] < -90 && position[1] > 90)
    ) {
        throw new ApiError(
            422,
            "invalid location[ longitude, latitude] field -180 <= longitude <= 180, -90 <=  latitude <= 90"
        );
    }


    let location = {
        type: "Point",
        coordinates: position, // [ longitude, latitude]
    };
    const species = new Species({
        name: name,
        location: location,
        user: user_id,
    });
    await species.save();
    return species;
}


const speciesPhotoHandler = asyncHandler(async (req, res) => {
    if (!req.file) {
        throw new ApiError(402, "file not upload successfully");
    }
    
    const options = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await axios.post(
        "http://127.0.0.1:8000/type",
        {
            photo: req.file.location,
        },
        options
    );
    const payload = {
        result:response.data,
        location : {}
    }
    // logger.info(req.body);
    const position = req.body.location;
    if (position){
        logger.info(req.body.location)
        payload.location = await saveLocation(position, payload.result?.species, req.user._id) // [longitude, latitude]
    }
    res.status(200).json(new ApiResponse(200, payload, "photo scan successfully"));
});

export { speciesPhotoHandler };
