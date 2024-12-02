from fastapi import FastAPI
from pydantic import BaseModel
import numpy as np
import joblib

api = FastAPI()
with open("models/solarpower_model.pkl", "rb") as f:
    solar_model = joblib.load(f)

class Input(BaseModel):
    parameters: list

@api.get("/")
def temp():
    return {"Hello World"}


@api.post("/predict")
def predict(data: Input):
    arr = np.array([data.parameters])
    pred = solar_model.predict(arr)
    return {"prediction": pred[0]}