import React, { useState } from 'react';
import { FaUser, FaHeartbeat, FaWeight, FaSmoking, FaCalendarAlt } from 'react-icons/fa';
import { MdFemale, MdMale } from 'react-icons/md';

const AssessmentForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    Sex: '',
    Age: '',
    HighBP: '',
    HeartDiseaseorAttack: '',
    BMI: '',
    Smoker: '',
    Resultado: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data being submitted:', formData);
    onSubmit(formData);
  };

  return (
    <section id="assessment" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-caprasimo text-lapis_lazuli-600 mb-4">
            Evaluación de Riesgo de Accidente Cerebrovascular
          </h2>
          <p className="text-lg font-raleway text-gray-600">
            Completa el formulario con tus datos médicos para obtener una evaluación personalizada
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Género */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaUser className="text-lapis_lazuli-500" />
                  Género
                </label>
                <select
                  name="Sex"
                  value={formData.Sex}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Seleccionar género</option>
                  <option value="0">👨 Masculino</option>
                  <option value="1">👩 Femenino</option>
                </select>
              </div>

              {/* Edad */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaCalendarAlt className="text-lapis_lazuli-500" />
                  Edad
                </label>
                <input
                  type="number"
                  name="Age"
                  value={formData.Age}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Ingrese su edad"
                  min="1"
                  max="120"
                  required
                />
              </div>

              {/* Hipertensión */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaHeartbeat className="text-red-500" />
                  ¿Tiene hipertensión arterial?
                </label>
                <select
                  name="HighBP"
                  value={formData.HighBP}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="0">❌ No</option>
                  <option value="1">✅ Sí</option>
                </select>
              </div>

              {/* Enfermedad cardíaca */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaHeartbeat className="text-orange-500" />
                  ¿Tiene enfermedad cardíaca o ha sufrido un ataque cardíaco?
                </label>
                <select
                  name="HeartDiseaseorAttack"
                  value={formData.HeartDiseaseorAttack}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="0">❌ No</option>
                  <option value="1">✅ Sí</option>
                </select>
              </div>

              {/* BMI */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaWeight className="text-mint-500" />
                  Índice de Masa Corporal (BMI)
                </label>
                <input
                  type="number"
                  name="BMI"
                  value={formData.BMI}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Ej: 25.5"
                  step="0.1"
                  min="10"
                  max="60"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Peso (kg) ÷ [Altura (m)]²
                </p>
              </div>

              {/* Estado de fumador */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                  <FaSmoking className="text-gray-500" />
                  ¿Es fumador?
                </label>
                <select
                  name="Smoker"
                  value={formData.Smoker}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="0">🚭 Nunca fumé</option>
                  <option value="1">🚬 Sí, fumo actualmente</option>
                </select>
              </div>
            </div>

            <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-6 mt-8">
              <h4 className="font-semibold text-teal-800 mb-3 flex items-center gap-2">
                ℹ️ Información importante
              </h4>
              <ul className="text-teal-700 text-sm space-y-1">
                <li>• Esta evaluación es solo informativa y no reemplaza la consulta médica</li>
                <li>• Los resultados se basan en algoritmos de inteligencia artificial</li>
                <li>• Consulte siempre con un profesional de la salud</li>
              </ul>
            </div>

            <div className="text-center pt-6">
              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary text-lg px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Evaluando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    🧠 Evaluar Riesgo de ACV
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AssessmentForm;