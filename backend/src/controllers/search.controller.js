import { logger } from "../../logger.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { prompt_template } from "../geminiSDK/prompt.js";
import { GenAiMedicineSuggestion } from "../geminiSDK/gemini.js";
import { User } from "../model/user.model.js";
import { Species } from "../model/species.model.js";

const medicineSuggestion = async (problem) => {
    try {
        //TODO: ADD TO FUNCTION
        const prompt_text =
            prompt_template["medical"] + problem + prompt_template["medical"];
        const response = await GenAiMedicineSuggestion(prompt_text);
        return response;
    } catch (error) {
        throw new ApiError(
            500,
            error.message || "Something went wrong in medicine suggestion"
        );
        return {};
    }
};

const speciesQuality = async (species) => {
    try {
        const prompt_text =
            prompt_template["species"][0] +
            species +
            prompt_template["species"][1];
        const response = await GenAiMedicineSuggestion(prompt_text);
        return response;
    } catch (error) {
        throw new ApiError(
            500,
            error.message || "something went wrong in species quality"
        );
        return {};
    }
};

const searchController = asyncHandler(async (req, res) => {
    let user = await User.findById(req.user._id);
    if (!user.isCreditForSearch()) {
        throw new ApiError(403, "Not Enough Credit for searching");
    }
    let response = {};
    if (req.body.species) {
        response = await speciesQuality(req.body.species);
    } else if (req.body.problem) {
        response = await medicineSuggestion(req.body.problem);
    } else {
        throw new ApiError(400, "Species or Problem field not found");
    }
    try {
        await user.decrementCreditForSearch();
        await user.save();
        res.status(200).json(new ApiResponse(200, response, "Gemini Response"));
    } catch (error) {
        console.log(error);
        throw new ApiError(
            500,
            error.message || "something wen wrong in search",
            error
        );
    }
});

//! only for development testing , remove it on production

const insertSampleLocation = asyncHandler(async (req, res) => {
    if (!req.body.location && !req.body.name) {
        throw new ApiError(422, "location and name is required");
    }
    let location = {
        type: "Point",
        coordinates: req.body.location,
    };
    const species = new Species({
        name: req.body.name,
        location: location,
        user: req.user._id,
    });
    await species.save();
    res.status(200).json(new ApiResponse(200, species, "Addedd successfully"));
});

const allLocation = asyncHandler(async (req, res) => {
    const species = await Species.find();
    res.status(200).json(new ApiResponse(200, species, "all data entry"));
});

const speciesLocation = asyncHandler(async (req, res) => {
    if (!req.query.species) {
        throw new ApiError(422, "species field is required");
    }
    try {
        const spieces = await Species.find({ name: req.query.species });
        res.status(200).json(new ApiResponse(200, spieces, "list of species"));
    } catch (error) {
        throw new ApiError(500, "something went wrong during search");
    }
});

export { searchController, insertSampleLocation, allLocation, speciesLocation };
