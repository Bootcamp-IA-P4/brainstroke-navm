import React, { useState } from 'react';

const AssessmentForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    hypertension: '',
    heart_disease: '',
    ever_married: '',
    residence_type: '',
    avg_glucose_level: '',
    bmi: '',
    work_type: '',
    smoking_status: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <section id="assessment" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Evaluación de Riesgo de Stroke
          </h2>
          <p className="text-lg text-gray-600">
            Completa el formulario con tus datos médicos para obtener una evaluación personalizada
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Género */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Género
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="0">Masculino</option>
                  <option value="1">Femenino</option>
                </select>
              </div>

              {/* Edad */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Edad
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="form-input"
                  min="1"
                  max="120"
                  required
                />
              </div>

              {/* Hipertensión */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ¿Tiene hipertensión?
                </label>
                <select
                  name="hypertension"
                  value={formData.hypertension}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="0">No</option>
                  <option value="1">Sí</option>
                </select>
              </div>

              {/* Enfermedad cardíaca */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ¿Tiene enfermedad cardíaca?
                </label>
                <select
                  name="heart_disease"
                  value={formData.heart_disease}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="0">No</option>
                  <option value="1">Sí</option>
                </select>
              </div>

              {/* Estado civil */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ¿Está casado/a?
                </label>
                <select
                  name="ever_married"
                  value={formData.ever_married}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="0">No</option>
                  <option value="1">Sí</option>
                </select>
              </div>

              {/* Tipo de residencia */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de residencia
                </label>
                <select
                  name="residence_type"
                  value={formData.residence_type}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="0">Rural</option>
                  <option value="1">Urbana</option>
                </select>
              </div>

              {/* Nivel de glucosa */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nivel promedio de glucosa (mg/dL)
                </label>
                <input
                  type="number"
                  name="avg_glucose_level"
                  value={formData.avg_glucose_level}
                  onChange={handleChange}
                  className="form-input"
                  step="0.1"
                  min="50"
                  max="300"
                  required
                />
              </div>

              {/* BMI */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Índice de Masa Corporal (BMI)
                </label>
                <input
                  type="number"
                  name="bmi"
                  value={formData.bmi}
                  onChange={handleChange}
                  className="form-input"
                  step="0.1"
                  min="10"
                  max="50"
                  required
                />
              </div>

              {/* Tipo de trabajo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de trabajo
                </label>
                <select
                  name="work_type"
                  value={formData.work_type}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="Private">Privado</option>
                  <option value="Self-employed">Autónomo</option>
                  <option value="children">Niño/a</option>
                  <option value="Govt_job">Gobierno</option>
                  <option value="Never_worked">Nunca trabajó</option>
                </select>
              </div>

              {/* Estado de fumador */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estado de fumador
                </label>
                <select
                  name="smoking_status"
                  value={formData.smoking_status}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="never smoked">Nunca fumó</option>
                  <option value="formerly smoked">Fumó anteriormente</option>
                  <option value="smokes">Fuma actualmente</option>
                  <option value="Unknown">Desconocido</option>
                </select>
              </div>
            </div>

            <div className="text-center pt-6">
              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary text-lg px-12 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Evaluando...' : 'Evaluar Riesgo'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AssessmentForm;