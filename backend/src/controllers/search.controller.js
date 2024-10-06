import { logger } from "../../logger.js";
import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { prompt_template } from "../geminiSDK/prompt.js";
import { GenAiMedicineSuggestion } from "../geminiSDK/gemini.js";

const medicineSuggestion = async (problem) => {
    try {
        //TODO: ADD TO FUNCTION
        const prompt_text =
            prompt_template["medical"] +
            problem +
            prompt_template["medical"];
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
        throw new ApiError(500, error.message || "something went wrong in species quality");
        return {}
    }
};

const searchController = asyncHandler(async (req, res) => {
    try {
        let response = {};
        if (req.body.species) {
            response = await speciesQuality(req.body.species);
        }
        else if (req.body.problem) {
            response = await medicineSuggestion(req.body.problem);
        }
        else{
            throw new ApiError(400, "Species or Problem field not found");
        }
        res.status(200).json(new ApiResponse(200, response, "Gemini Response"));
    } catch (error) {
        throw new ApiError(500, error.message || "something wen wrong in search");
    }
});

export { searchController };
