from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
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
    model_path = os.path.join(os.path.dirname(__file__), '..', 'model', 'model2.pkl')
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
    gender: str
    age: float
    hypertension: bool
    heart_disease: bool
    ever_married: str
    work_type: str
    Residence_type: str
    avg_glucose_level: float
    bmi: float
    smoking_status: str
    resultado: str

# Este es el BaseModel para la predicción, es como recibimos los datos del front, lo recibimos todos como strings.
class PredictionRequest(BaseModel):
    gender: str
    age: str
    hypertension: str
    heart_disease: str
    ever_married: str
    Residence_type: str
    avg_glucose_level: str
    bmi: str
    work_type: str
    smoking_status: str

class PredictionResponse(BaseModel):
    probability: float
    risk_level: str
    factors: list
    input_data: Dict[str, Any]

# Vamos a transformar los datos que recibimos del frontend en un User con los tipos de datos que tenemos en Supabase:

def convert_to_user(data: PredictionRequest, probability:float) -> User:
    return User(
        gender= "Male" if data.gender == "1" else "Female",
        age=float(data.age),
        hypertension=data.hypertension == "1",
        heart_disease=data.heart_disease == "1",
        ever_married="Yes" if data.ever_married == "1" else "No",
        Residence_type="Urban" if data.Residence_type == "1" else "Rural",
        avg_glucose_level=float(data.avg_glucose_level),
        bmi=float(data.bmi),
        work_type=data.work_type,
        smoking_status=data.smoking_status,
        resultado=f"{probability:.3f}"
    )


def preprocess_input(data: PredictionRequest) -> np.ndarray:
    """Procesar input del usuario para que coincida con el formato del modelo"""
    
    # Convertir strings a números
    gender = 1 if data.gender == "1" else 0
    age = float(data.age)
    hypertension = 1 if data.hypertension == "1" else 0
    heart_disease = 1 if data.heart_disease == "1" else 0
    ever_married = 1 if data.ever_married == "1" else 0
    Residence_type = 1 if data.Residence_type == "1" else 0
    avg_glucose_level = float(data.avg_glucose_level)
    bmi_value = float(data.bmi)
    
    # Crear el input según el orden de columnas del dataset_encoded.csv
    input_data = {
        'gender': gender,
        'age': age,
        'hypertension': hypertension,
        'heart_disease': heart_disease,
        'ever_married': ever_married,
        'Residence_type': Residence_type,
        'avg_glucose_level': avg_glucose_level,
        'bmi': bmi_value,
        'work_type_Private': 0.0,
        'work_type_Self-employed': 0.0,
        'work_type_children': 0.0,
        'smoking_status_formerly smoked': 0.0,
        'smoking_status_never smoked': 0.0,
        'smoking_status_smokes': 0.0
    }
    
    if data.work_type in input_data:
        input_data[f'work_type_{data.work_type}'] = 1.0
    if data.smoking_status in ["formerly smoked", "never smoked", "smokes"]:
        input_data[f'smoking_status_{data.smoking_status}'] = 1.0

    features = list(input_data.values())
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
        
        if float(data.age) > 65:
            factors.append("Edad avanzada")
        if data.hypertension == "1":
            factors.append("Hipertensión")
        if data.heart_disease == "1":
            factors.append("Enfermedad cardíaca")
        if float(data.avg_glucose_level) > 126:
            factors.append("Glucosa elevada")
        if float(data.bmi) > 30:
            factors.append("Obesidad")
        
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
        response = supabase.table("brain_stroke").select("*").order('created_at', desc=True).limit(10).execute()
        return {"brain_stroke": response.data}
    except Exception as e:
        return {"error": str(e), "brain_stroke": []}