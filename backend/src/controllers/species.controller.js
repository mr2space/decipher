import { logger } from "../../logger.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { User } from "../model/user.model.js";
import { Species } from "../model/species.model.js";
import axios from "axios";

const saveLocation = async (position, name, user_id) => {
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
};

const requestPlantSpecies = async (req, res) => {
    const options = {
        params: {
            "include-related-images": true,
            "nb-results": 1,
            "api-key": process.env.MODEL_PLANT_API,
            "images": req.file.location,
        },
    };
    const response = await axios.get(process.env.MODEL_PLANT_HOST, options);
    console.log(JSON.stringify(response.data));
    return {
        score: response.data.results[0].score * 100,
        species: [
            response.data.results[0].species.scientificNameWithoutAuthor,
            response.data.results[0].species?.commonNames[0],
        ],
        images: [
            response.data.results[0].images[0].url.o,
            response.data.results[0].images[0].url.m,
        ],
    };
};

const speciesPhotoHandler = asyncHandler(async (req, res) => {
    if (!req.file) {
        throw new ApiError(402, "file not upload successfully");
    }
    const details = await requestPlantSpecies(req, res);
    const payload = {
        ... details,
        location: {},
        photoURL: req.file.location
    };
    // logger.info(req.body);
    const position = req.body.location;
    console.log(position);
    if (position) {
        logger.info(req.body.location);
        payload.location = await saveLocation(
            position,
            payload.species[1].toLowerCase(),
            req.user._id
        ); // [longitude, latitude]
        payload.location.save();
    }
    res.status(200).json(
        new ApiResponse(200, payload, "photo scan successfully")
    );
});

export { speciesPhotoHandler };
