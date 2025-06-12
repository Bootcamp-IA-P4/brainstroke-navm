from server.database.db_connection import supabase

def save_user(data_dict):
    try:
        print("Intentando guardar:", data_dict)
        response = supabase.table("brainstroke").insert(data_dict).execute()
        print("Paciente guardado correctamente:", response.data)
        return response.data
    except Exception as e:
        print(f"❌ Error al guardar el paciente: {e}")
        return None