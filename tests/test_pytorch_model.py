import os
import torch
from torchvision import transforms
from torchvision.models.mobilenetv2 import MobileNetV2
from PIL import Image
import unittest

torch.serialization.add_safe_globals([MobileNetV2])

def load_model():
    pth_path = os.path.join(os.path.dirname(__file__), '..', 'model', 'model2.pth')
    model = torch.load(pth_path, map_location=torch.device('cpu'), weights_only=False)
    model.eval()
    return model

class TestPyTorchModel(unittest.TestCase):

    def test_model_loads(self):
        model = load_model()
        self.assertIsNotNone(model)

    def test_predict_image(self):
        model = load_model()
        transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor(),
            transforms.Normalize([0.485, 0.456, 0.406], [0.229, 0.224, 0.225])
        ])
        img = Image.new('RGB', (224, 224), color='white')
        img_t = transform(img).unsqueeze(0)
        with torch.no_grad():
            output = model(img_t)
            self.assertEqual(output.shape[1], 3)

if __name__ == '__main__':
    unittest.main()