import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

def test_connection():
    try:
        response = supabase.table("brain_stroke").select("*").limit(1).execute()
        return response.data is not None
    except Exception as e:
        print(f"❌Error al conectar a la base de datos: {e}")
        return False
    
if __name__ == "__main__":
    if test_connection():
        print("💕 Conexión exitosa a la base de datos.")
    else:
        print("❌ Falló la conexión a la base de datos.")