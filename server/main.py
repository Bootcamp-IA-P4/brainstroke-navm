from fastapi import FastAPI
from pydantic import BaseModel
from server.database.save_user import save_user
from server.database.db_connection import supabase

app = FastAPI()
@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI server!"}


class User(BaseModel):
    gender: bool
    age: float
    hypertension: bool
    heart_disease: bool
    work_type: str
    Residence_type: bool
    avg_glucose_level: float
    bmi: float
    smoking_status: str
    resultado: str

@app.post("/users/")
def create_user(user: User):
    data_dict = user.model_dump()
    result = save_user(data_dict)
    return {"message": "User saved successfully", "data": result}

@app.get("/users/")
def get_users():
    try:
        response = supabase.table("users").select("*").limit(20).execute()
        return {"users": response.data}
    except Exception as e:
        return {"error": str(e)}
    


# uvicorn server.main:app --reload