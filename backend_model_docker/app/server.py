import os
import pickle as pk
import tensorflow as tf
import numpy as np
from fastapi import *

model:tf.keras.models.Sequential = tf.keras.models.load_model(r"./model.h5")
class_name = None
with open("./training_set.pkl", "rb") as f:
    class_name = pk.load(f)

class_name = np.array(list(class_name.keys()))
    
def init_model():
    """ load the model in python

    Returns:
        [keras_model, class_name]
    """
    model = tf.keras.models.load_model(r"./model.h5")
    with open("./training_set.pkl", "rb") as f:
        class_name = pk.load(f)
    return [model, class_name]

# init_model()

app = FastAPI()

@app.get("/")
def model_status():
    
    return {
        "status":"model_loaded",
        "model" : model.to_json()
    }   


@app.post("/predict")
async def predict_species(image: UploadFile = File(...)):
    file_save_path="images/"+image.filename
    with open(file_save_path, "ab") as f:
        f.write(image.file.read())
    from keras.preprocessing import image
    test_image = image.load_img(file_save_path, target_size=(128, 128))
    test_image = image.img_to_array(test_image)
    test_image = np.expand_dims(test_image, axis = 0)
    result = model.predict(test_image)
    result = result.astype('int')
    species = class_name[result[0]][0]
    os.remove(file_save_path)
    return {"species":species}

