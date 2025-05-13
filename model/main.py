from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, HttpUrl
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image as keras_image
from tensorflow.keras.preprocessing import image
import numpy as np
import json
import requests
from PIL import Image
import io

# Initialize FastAPI
app = FastAPI()

# Load model
model = load_model(r"model_val_accuracy_lite_96-0.95.keras")

# Load class labels
with open("class_labels_v1.json", "r", encoding="utf-8") as f:
    class_labels = json.load(f)

class_labels = {int(k): v for k, v in class_labels.items()}

IMAGE_SIZE = (299, 299)

def preprocess_image_from_url(image_url: str):
    try:
        response = requests.get(image_url)
        response.raise_for_status()
        img = Image.open(io.BytesIO(response.content)).convert("RGB")
        img = img.resize(IMAGE_SIZE)
        img_array = keras_image.img_to_array(img)
        img_array = np.expand_dims(img_array, axis=0)
        img_array = img_array / 255.0
        return img_array
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Image processing failed: {e}")


@app.get("/predict")
async def predict(
    images: str = Query(...),
    api_key: str = Query(..., alias="api-key"),
    nb_results: int = Query(1, alias="nb-results"),
    include_related_images: bool = Query(True, alias="include-related-images")
    ):
    try:
        img_array = preprocess_image_from_url(images)
        predictions = model.predict(img_array)
        predicted_index = int(np.argmax(predictions, axis=1)[0])
        confidence = float(np.max(predictions))
        species_data = class_labels.get(predicted_index, {})
        data = {
            "score": round(confidence, 4),  # Axios multiplies by 100
            "species": {
                "scientificNameWithoutAuthor": species_data.get("scientificNameWithoutAuthor", "Unknown"),
                "commonNames": species_data.get("commonNames", ["Unknown"])
            },
            "images": [{
                "url": {
                    "o": species_data.get("images", {}).get("o", ""),
                    "m": species_data.get("images", {}).get("m", "")
                }
            }]
        }

        response = {
            "results": [data]
        }
        print(response)
        return JSONResponse(content = response)
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})
