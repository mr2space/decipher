import { GoogleGenerativeAI } from "@google/generative-ai";
import { ApiError } from "../Utils/ApiError.js";

async function GenAiMedicineSuggestion(prompt) {
    let result = ""
    try {
        const generationConfig = {
            temperature: 1,
            responseMimeType: "application/json",
        };
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY, {
            generationConfig: generationConfig,
        });
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        result = await model.generateContent(prompt);
        
        //? assumption the result format {"response":{"candidates":[{"content":{"parts":[{"text":"```
        // console.log(JSON.stringify(result));
        //? {"response":{"candidates":[{"content":{"parts":[{"text":f
        result =  result.response.text();
        const cleanedString = result.replace(/```json\n|\n```/g, '').trim();
        return JSON.parse(cleanedString);
    } catch (error) {
        throw new ApiError(500, result || "something went wrong", error);
    }
}

function GenAiErrorHandle() {}

export { GenAiMedicineSuggestion, GenAiErrorHandle };
