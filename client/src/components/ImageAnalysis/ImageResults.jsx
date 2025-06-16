import React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaExclamationCircle, FaRedo, FaArrowLeft } from 'react-icons/fa';

const ImageResults = ({ result, onReset, onBackToUpload }) => {
  // Misma lógica que Results.jsx pero adaptada para imágenes
  const getRiskLevel = (probability) => {
    if (probability < 0.3) return { 
      level: 'Bajo', 
      color: 'text-mint-700', 
      bg: 'bg-mint-50 border-mint-200',
      icon: <FaCheckCircle className="text-6xl text-mint-600" />
    };
    if (probability < 0.7) return { 
      level: 'Moderado', 
      color: 'text-cream-100', 
      bg: 'bg-cream-300 border-cream-400',
      icon: <FaExclamationTriangle className="text-6xl text-orange-500" />
    };
    return { 
      level: 'Alto', 
      color: 'text-lapis_lazuli-700', 
      bg: 'bg-lapis_lazuli-50 border-lapis_lazuli-200',
      icon: <FaExclamationCircle className="text-6xl text-red-600" />
    };
  };

  const risk = getRiskLevel(result?.probability || 0);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 fade-in">
      <div className="card slide-up">
        <div className="mb-6 text-center">
          <h3 className="text-3xl font-bold text-lapis_lazuli-600 mb-2">
            Resultado del Análisis por Imagen
          </h3>
          <p className="text-teal-600 text-lg">
            Basado en la imagen proporcionada y nuestro modelo de IA
          </p>
        </div>

        <div className={`${risk.bg} border-2 rounded-xl p-8 mb-6 text-center`}>
          <div className="mb-4 flex justify-center">{risk.icon}</div>
          <div className="text-5xl font-bold mb-2 text-gradient">
            {((result?.probability || 0) * 100).toFixed(1)}%
          </div>
          <div className={`text-2xl font-semibold ${risk.color} mb-2`}>
            Riesgo {risk.level}
          </div>
          <p className="text-lapis_lazuli-400 text-lg">
            Probabilidad de accidente cerebrovascular
          </p>
        </div>

        <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-6 mb-6">
          <h4 className="font-semibold text-teal-800 mb-3 flex items-center gap-2">
            <FaExclamationTriangle className="text-xl text-orange-500" />
            Importante
          </h4>
          <p className="text-teal-700 leading-relaxed">
            Este resultado es solo una evaluación preliminar basada en IA. 
            No reemplaza el diagnóstico médico profesional. Consulte con su médico 
            para una evaluación completa.
          </p>
        </div>

        <div className="space-y-4">
          <button 
            onClick={onBackToUpload}
            className="btn-secondary w-full text-lg py-4 flex items-center justify-center gap-2"
          >
            <FaArrowLeft />
            Analizar otra imagen
          </button>
          <button 
            onClick={onReset}
            className="btn-primary w-full text-lg py-4 flex items-center justify-center gap-2"
          >
            <FaRedo />
            Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageResults;