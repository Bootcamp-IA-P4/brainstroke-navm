from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from server.database.save_user import save_user
from server.database.db_connection import supabase
import joblib
import pandas as pd
import numpy as np
import os
from typing import Optional

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

class PredictionRequest(BaseModel):
    gender: str
    age: str
    hypertension: str
    heart_disease: str
    ever_married: str
    residence_type: str
    avg_glucose_level: str
    bmi: str
    work_type: str
    smoking_status: str

class PredictionResponse(BaseModel):
    probability: float
    risk_level: str
    factors: list

def preprocess_input(data: PredictionRequest) -> np.ndarray:
    """Procesar input del usuario para que coincida con el formato del modelo"""
    
    # Convertir strings a números
    gender = 1 if data.gender == "1" else 0
    age = float(data.age)
    hypertension = 1 if data.hypertension == "1" else 0
    heart_disease = 1 if data.heart_disease == "1" else 0
    ever_married = 1 if data.ever_married == "1" else 0
    residence_type = 1 if data.residence_type == "1" else 0
    avg_glucose_level = float(data.avg_glucose_level)
    bmi_value = float(data.bmi)
    
    # Crear el input según el orden de columnas del dataset_encoded.csv
    input_data = {
        'gender': gender,
        'age': age,
        'hypertension': hypertension,
        'heart_disease': heart_disease,
        'ever_married': ever_married,
        'Residence_type': residence_type,
        'avg_glucose_level': avg_glucose_level,
        'bmi': bmi_value,
        'work_type_Private': 0.0,
        'work_type_Self-employed': 0.0,
        'work_type_children': 0.0,
        'smoking_status_formerly smoked': 0.0,
        'smoking_status_never smoked': 0.0,
        'smoking_status_smokes': 0.0
    }
    
    # One-hot encoding para work_type
    if data.work_type == 'Private':
        input_data['work_type_Private'] = 1.0
    elif data.work_type == 'Self-employed':
        input_data['work_type_Self-employed'] = 1.0
    elif data.work_type == 'children':
        input_data['work_type_children'] = 1.0
    
    # One-hot encoding para smoking_status
    if data.smoking_status == 'formerly smoked':
        input_data['smoking_status_formerly smoked'] = 1.0
    elif data.smoking_status == 'never smoked':
        input_data['smoking_status_never smoked'] = 1.0
    elif data.smoking_status == 'smokes':
        input_data['smoking_status_smokes'] = 1.0
    
    # Convertir a array en el orden correcto
    features = [
        input_data['gender'],
        input_data['age'],
        input_data['hypertension'],
        input_data['heart_disease'],
        input_data['ever_married'],
        input_data['Residence_type'],
        input_data['avg_glucose_level'],
        input_data['bmi'],
        input_data['work_type_Private'],
        input_data['work_type_Self-employed'],
        input_data['work_type_children'],
        input_data['smoking_status_formerly smoked'],
        input_data['smoking_status_never smoked'],
        input_data['smoking_status_smokes']
    ]
    
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
        if probability < 0.3:
            risk_level = "Bajo"
        elif probability < 0.7:
            risk_level = "Moderado"
        else:
            risk_level = "Alto"
        
        # Factores de riesgo
        factors = []
        age_val = float(data.age)
        glucose_val = float(data.avg_glucose_level)
        bmi_val = float(data.bmi)
        
        if age_val > 65:
            factors.append("Edad avanzada")
        if data.hypertension == "1":
            factors.append("Hipertensión")
        if data.heart_disease == "1":
            factors.append("Enfermedad cardíaca")
        if glucose_val > 126:
            factors.append("Glucosa elevada")
        if bmi_val > 30:
            factors.append("Obesidad")
        
        # Guardar en base de datos
        try:
            user_data = {
                "gender": data.gender,
                "age": age_val,
                "hypertension": data.hypertension == "1",
                "heart_disease": data.heart_disease == "1",
                "ever_married": data.ever_married,
                "work_type": data.work_type,
                "Residence_type": data.residence_type,
                "avg_glucose_level": glucose_val,
                "bmi": bmi_val,
                "smoking_status": data.smoking_status,
                "resultado": f"{probability:.3f}"
            }
            save_user(user_data)
        except Exception as db_error:
            print(f"Error saving to database: {db_error}")
        
        return PredictionResponse(
            probability=float(probability),
            risk_level=risk_level,
            factors=factors
        )
        
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error in prediction: {str(e)}")

@app.post("/users/")
def create_user(user: User):
    data_dict = user.model_dump()
    result = save_user(data_dict)
    return {"message": "User saved successfully", "data": result}

@app.get("/users/")
def get_users():
    try:
        response = supabase.table("brain_stroke").select("*").order('created_at', desc=True).limit(50).execute()
        return {"brain_stroke": response.data}
    except Exception as e:
        return {"error": str(e), "brain_stroke": []}