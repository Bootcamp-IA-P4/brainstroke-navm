import unittest
from fastapi.testclient import TestClient
from server.main import app
from PIL import Image 
import io

client = TestClient(app)

class TestAPI(unittest.TestCase):
    def test_root(self):
        response = client.get("/")
        self.assertEqual(response.status_code, 200)
        self.assertIn("message", response.json())

    def test_predict(self):
        data = {
            "Age": "45",
            "Sex": "1",
            "HighBP": "0",
            "HeartDiseaseorAttack": "0",
            "BMI": "25",
            "Smoker": "0",
            "Resultado": ""
        }
        response = client.post("/api/predict", json=data)
        self.assertEqual(response.status_code, 200)
        self.assertIn("probability", response.json())
        self.assertIn("risk_level", response.json())

    def test_predict_image(self):
        img = Image.new('RGB', (224, 224), color='white')
        img_bytes = io.BytesIO()
        img.save(img_bytes, format='JPEG')
        img_bytes.seek(0)
        files = {"file": ("test.jpg", img_bytes, "image/jpeg")}
        response = client.post("/api/predict_image", files=files)
        self.assertIn(response.status_code, (200, 400))

if __name__ == '__main__':
    unittest.main()