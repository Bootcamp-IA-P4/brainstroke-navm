from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, field_validator
from server.database.save_user import save_user
from server.database.db_connection import supabase
import joblib
import pandas as pd
import numpy as np
import os
from typing import Optional, List, Dict, Any

app = FastAPI()

# Configurar CORS para permitir requests desde React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # URLs de React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Cargar el modelo ML al iniciar la aplicación
try:
    model_path = os.path.join(os.path.dirname(__file__), '..', 'model', 'modelo_xgb.pkl')
    model = joblib.load(model_path)
    print("✅ Modelo cargado exitosamente!")
except Exception as e:
    print(f"❌ Error cargando modelo: {e}")
    model = None

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI server!", "model_loaded": model is not None}


# Este es el BaseModel para guardar los datos en valores que tenemos en supabase.
class User(BaseModel):
    Age: float
    Sex: float
    HighBP: float
    HeartDiseaseorAttack: float
    BMI: float
    Smoker: float
    Resultado: str

# Este es el BaseModel para la predicción, es como recibimos los datos del front, lo recibimos todos como strings.
class PredictionRequest(BaseModel):
    Age: str
    Sex: str
    HighBP: str
    HeartDiseaseorAttack: str
    BMI: str
    Smoker: str
    Resultado: str

class PredictionResponse(BaseModel):
    probability: float
    risk_level: str
    factors: list
    input_data: Dict[str, Any]

# Vamos a transformar los datos que recibimos del frontend en un User con los tipos de datos que tenemos en Supabase:

def convert_to_user(data: PredictionRequest, probability:float) -> User:
    return User(
        Age=float(data.Age),
        Sex=float(data.Sex),
        HighBP=float(data.HighBP),
        HeartDiseaseorAttack=float(data.HeartDiseaseorAttack),
        BMI=float(data.BMI),
        Smoker=float(data.Smoker),
        Resultado = f"{probability:.6f}"
    )


def preprocess_input(data: PredictionRequest) -> np.ndarray:
    """Procesar input del usuario para que coincida con el formato del modelo"""

    features = [
        float(data.Age),        # Edad
        float(data.Sex),        # Género (0=Masculino, 1=Femenino)
        float(data.HighBP),     # Hipertensión (0=No, 1=Sí)
        float(data.HeartDiseaseorAttack),  # Enfermedad cardíaca (0=No, 1=Sí)
        float(data.BMI),        # Índice de masa corporal
        float(data.Smoker)      # Fumador (0=No, 1=Sí)
    ]
    
    print(f"🔍 Input features (Age, Sex, HighBP, HeartDisease, BMI, Smoker): {features}")
    return np.array([features])
    
@app.post("/api/predict", response_model=PredictionResponse)
async def predict_stroke(data: PredictionRequest):
    if model is None:
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    try:
        # Preprocesar datos
        input_array = preprocess_input(data)
        
        # Hacer predicción
        if hasattr(model, 'predict_proba'):
            probability = model.predict_proba(input_array)[0][1]  # Probabilidad de stroke
        else:
            # Si el modelo no tiene predict_proba, usar predict y convertir
            prediction = model.predict(input_array)[0]
            probability = float(prediction)
        
        # Determinar nivel de riesgo
        risk_level = (
            "Bajo" if probability < 0.3 else
            "Moderado" if probability < 0.7 else
            "Alto"
        )
        
        # Factores de riesgo
        factors = []
        
        if float(data.Age) > 65:
            factors.append("Edad avanzada")
        if float(data.HighBP) == 1:
            factors.append("Hipertensión")
        if float(data.HeartDiseaseorAttack) == 1:
            factors.append("Enfermedad cardíaca")
        if float(data.BMI) > 30:
            factors.append("Obesidad")
        if float(data.Smoker) == 1:
            factors.append("Fumador")
        
        # Guardar en base de datos
        try:
            user = convert_to_user(data, probability)
            save_user(user.model_dump())
        except Exception as db_error:
            print(f"Error saving to database: {db_error}")
        
        return PredictionResponse(
            probability=probability,
            risk_level=risk_level,
            factors=factors,
            input_data=data.dict()
        )
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error in prediction: {str(e)}")

@app.get("/users/")
def get_users():
    try:
        response = supabase.table("brainstroke").select("*").order('Created_at', desc=True).limit(10).execute()
        return {"brainstroke": response.data}
    except Exception as e:
        return {"error": str(e), "brainstroke": []}