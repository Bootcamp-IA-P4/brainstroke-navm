import unittest
import pandas as pd
import joblib
import os
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

model_path = os.path.join('model', 'modelo_xgb.pkl')
data_path = os.path.join('data', 'csv_final.csv')

class TestModel(unittest.TestCase):
    def setUp(self):
        self.model = joblib.load(model_path)
        
    def test_model_loaded(self):
        self.assertIsNotNone(self.model, "Model should be loaded successfully.")

    def test_predictino_shape(self):
        df = pd.read_csv(data_path)
        X = df.drop(columns=['Stroke'])
        y_pred = self.model.predict(X)
        self.assertEqual(len(y_pred), len(X), "Prediction should match the number of input samples.")

    def test_prediction_values(self):
        df = pd.read_csv(data_path)
        X = df.drop(columns=['Stroke'])
        y_pred = self.model.predict(X)
        self.assertTrue(set(y_pred).issubset({0, 1}), "La predicción debería tener 0 o 1")

    def test_minimum_accuracy(self):
        df = pd.read_csv(data_path)
        X = df.drop(columns=['Stroke'])
        y = df['Stroke']
        y_pred = self.model.predict(X)
        accuracy = accuracy_score(y, y_pred)
        self.assertGreaterEqual(accuracy, 0.7, "La precisión del modelo debería ser al menos 70%.")

if __name__ == '__main__':
    unittest.main()