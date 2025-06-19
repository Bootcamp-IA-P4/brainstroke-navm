<div align="center">
  <img src="https://res.cloudinary.com/artevivo/image/upload/v1749820724/Captura_de_pantalla_2025-06-13_151720_gynhuu.png" alt="Banner centrado" width="900" height="450">
</div>


## 📌 Index

| Section | Link |
|--------|------|
| 🔍 About | [About the Project](#-about-the-project) |
| ✨ Features | [Main Features](#-main-features) |
| 🐞 Issues | [Current Issues](#-current-issues) |
| 📁 Structure | [Folder Structure](#-folder-structure) |
| 🧠 Improvements | [Possible Improvements](#-possible-improvements) |
| 🗺️ Diagram | [Architecture Diagram](#-architecture-diagram) |
| ⚙️ Usage | [Installation and Usage](#-installation-and-usage) |
| 📊 Performance | [Model Performance: XGBoost & Neural Network](#-model-performance-xgboost--neural-network) |
| 🧪 Testing | [Testing](#-testing) |
| 🎥 Demo | [Demo](#-demo) |
| 🚀 Deployment | [Render Deployment](#-render-deployment) |
| 🐳 Docker | [Dockerization](#-dockerization) |
| 🤝 Team | [Collaborators](#-collaborators) |

---

## 🧠 About the Project

This project focuses on predicting the risk of suffering a stroke using a machine learning model trained on a real-world health dataset. The model analyzes key personal, medical, and lifestyle factors to determine whether an individual is at risk. The goal is to support early detection and prevention by providing fast, data-driven assessments through a user-friendly web interface.

---

## 🔍 Main Features  
✅ Complete EDA process with data cleaning and visualizations.  
✅ Binary classification using **XGBoost Classifier**.  
✅ Backend built with **Python** and **FastApi**.  
✅ Frontend developed with **Node** and **React**.
✅ Database integration using **Supabase**.  
✅ Modular and scalable project structure.  

---

## 🐞 Current Issues  
❌The model's accuracy is limited due to the small dataset size. Increasing the amount and diversity of data could significantly improve performance.

---

## 💡 Possible Improvements  
✅ Add user authentication and data history  

---

## 📁 Folder Structure

```bash
# Clasificación_Multiclase_equipo_6
📂 Clasificaci-n_Multiclase_equipo_6
├── 📂 .venv/
├── 📂 .github/
├── 📂 client/
│   └── 📂 public/
│   └── 📂 src/
│       └── 📂 assets/
│       └── 📂 components/
│               └── About.jsx/
│               └── AssesmentForm.jsx/
│               └── Header.jsx/
│               └── Hero.jsx/
│               └── PredictionHistory.jsx/
│       └── App.jsx/
│       └── main.jsx/
├── 📂 data/  
│   └── csv_final.csv
├── 📂 eda/
│   └── EDA.ipynb
│── 📂 model/
│   └── modelo_xgb.pkl
│   └── models.ipynb
│   └── encoded.py              
├── 📂 server/
│   └── 📂 database/
│         └── db_connection.py
│         └── save_user.py
│   └── requirements.txt
│   └── main.py
│   └── dockerfile
├── 📂 tests/
│   └── test_model.py
├── 📜 .env 
├── 📜 README.md  
├── 📜 .gitignore  
├── 📜 requirements.txt
├── 📜 dockerfile
├── 📜 docker-compose.yaml
├── 📜 .dockerignore
```
---

## 🧠 Architecture Diagram
<div align="center">
  <img src="https://res.cloudinary.com/artevivo/image/upload/v1750155063/BrainStroke_bkhsgw.jpg" alt="Diagrama de arquitectura" width="500" height="420">
</div>
---

## ⚙️ Installation and Usage

### 1️⃣ Clone the repository
```bash
git clone https://github.com/Bootcamp-IA-P4/brainstroke-navm.git
cd brainstroke-navm
```
### 2️⃣ Create and activate the virtual environment
```bash
python -m venv .venv
source .venv/Scripts/activate # Windows
source .venv/bin/activate  # Linux/Mac
```
### 3️⃣ Install backend dependencies and run the API
```bash
pip install -r requirements.txt
uvicorn server.main:app --reload
```

### 4️⃣ Install and run the frontend
```bash
cd client
npm install
npm run dev
```
---

## 📊 Model Performance: XGBoost & Neural Network

### 🔸 XGBoost Classifier
- **Type**: Binary Classification  
- **Target**: Predict stroke risk based on tabular health data  
- **Framework**: `scikit-learn`, `xgboost`  
- **Performance**:
  <div align="center">
    <img src="https://res.cloudinary.com/artevivo/image/upload/v1750151134/Captura_de_pantalla_2025-06-17_110521_ifjiae.png" alt="XGBoost Metrics" width="600" height="200">
  </div>

---

### 🔸 Neural Network (MobileNetV2 - Transfer Learning)
- **Type**: Convolutional Neural Network (CNN)  
- **Task**: Multiclass classification of brain CT images  
- **Classes**: Bleeding, Ischemia, Normal  
- **Input**: 224x224 RGB images  
- **Base Model**: Pretrained `MobileNetV2`  
- **Final Layer**: `nn.Linear(model.last_channel, 3)`  
- **Loss Function**: `CrossEntropyLoss`  
- **Optimizer**: `Adam (lr=1e-4)`  
- **Epochs**: 6  
- **Dataset**: Custom-labeled CT image dataset  
- **Model File**: `model/model2.pth`

<div align="center">
  <img src="https://res.cloudinary.com/artevivo/image/upload/v1750319932/Captura_de_pantalla_2025-06-19_095810_qvk0gz.png" alt="metrics" width="600" height="230">
</div>

---

## 🧐 Testing
Copy the following command to run the tests:
```bash
python -m unittest discover
```
<div align="center">
  <img src="https://res.cloudinary.com/artevivo/image/upload/v1750160289/Captura_de_pantalla_2025-06-17_133711_xjdvyx.png" alt="test" width="500" height="100">
</div>

---

## 📂 Demo
🔗 ▶️ [Ver Demo](https://res.cloudinary.com/artevivo/video/upload/v1750164352/V%C3%ADdeo_sin_t%C3%ADtulo_Hecho_con_Clipchamp_4_sbeps8.mp4)

---

## 🚀 Deployment on Render

🔹 You can view the **live frontend** of the project here:  
🌐 [https://brainstroke-navm-1-front.onrender.com](https://brainstroke-navm-1-front.onrender.com)

🔹 You can access the **API documentation** here:  
🛠️ [https://brainstroke-navm.onrender.com](https://brainstroke-navm.onrender.com)

> ℹ️ *Note: It might take a few seconds to load when idle, as free Render services may enter sleep mode.*

---

## 🐋 Dockerization

This application is Dockerized. To run it, execute the following command:

```bash
docker-compose up --build
```
<div align="center">
  <img src="https://res.cloudinary.com/artevivo/image/upload/v1750319665/docker_brainStroke_mmhzko.png" alt="docker" width="600" height="350">
</div>

---

## 🧑‍💻 Collaborators
This project was developed by the following contributors:
- [Michael López](https://github.com/mikewig/)  
- [Veida Velázquez](https://github.com/DarthVada36/)   
- [Nhoeli Salazar](https://github.com/Nho89/)   
- [Alejandro Rajado](https://github.com/Alex-rajass/)
---
<p align="right">(<a href="#-index">⬆️ Back to top</a>)</p>
