import React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaExclamationCircle, FaRedo, FaArrowLeft, FaImage } from 'react-icons/fa';

const ImageResults = ({ result, onReset, onBackToUpload }) => {
  // Adaptado para clasificación de imágenes médicas
  const getClassificationInfo = (clasePredecida, confianza) => {
    const confidence = (confianza * 100).toFixed(1);
    
    switch (clasePredecida) {
      case 'Normal':
        return {
          type: 'Normal',
          level: 'Sin Anomalías Detectadas',
          color: 'text-mint-700',
          bg: 'bg-mint-50 border-mint-200',
          icon: <FaCheckCircle className="text-6xl text-mint-600" />,
          description: 'La imagen no muestra signos de accidente cerebrovascular',
          confidence: confidence
        };
      case 'Ischemia':
        return {
          type: 'Isquemia',
          level: 'Posible Isquemia Cerebral',
          color: 'text-orange-700',
          bg: 'bg-orange-50 border-orange-200',
          icon: <FaExclamationTriangle className="text-6xl text-orange-500" />,
          description: 'Se detectan signos compatibles con isquemia cerebral',
          confidence: confidence
        };
      case 'Bleeding':
        return {
          type: 'Hemorragia',
          level: 'Posible Hemorragia Cerebral',
          color: 'text-red-700',
          bg: 'bg-red-50 border-red-200',
          icon: <FaExclamationCircle className="text-6xl text-red-600" />,
          description: 'Se detectan signos compatibles with hemorragia cerebral',
          confidence: confidence
        };
      default:
        return {
          type: 'Desconocido',
          level: 'Resultado No Clasificado',
          color: 'text-gray-700',
          bg: 'bg-gray-50 border-gray-200',
          icon: <FaExclamationTriangle className="text-6xl text-gray-500" />,
          description: 'No se pudo clasificar la imagen',
          confidence: confidence
        };
    }
  };

  const classificationInfo = getClassificationInfo(result?.clase_predicha, result?.confianza);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 fade-in">
      <div className="card slide-up">
        <div className="mb-6 text-center">
          <h3 className="text-3xl font-caprasimo text-lapis_lazuli-600 mb-2">
            Resultado del Análisis por Imagen
          </h3>
          <p className="text-teal-600 text-lg">
            Basado en la imagen proporcionada y nuestro modelo de IA
          </p>
        </div>

        {/* Mostrar imagen analizada */}
        {result?.image_url && (
          <div className="mb-6 text-center">
            <div className="inline-block p-2 bg-gray-100 rounded-lg">
              <img 
                src={result.image_url} 
                alt="Imagen analizada" 
                className="max-w-full max-h-48 rounded-lg shadow-md"
              />
            </div>
          </div>
        )}

        {/* Resultado de la clasificación */}
        <div className={`${classificationInfo.bg} border-2 rounded-xl p-8 mb-6 text-center`}>
          <div className="mb-4 flex justify-center">{classificationInfo.icon}</div>
          
          <div className="text-4xl font-bold mb-2 text-gradient">
            {classificationInfo.type}
          </div>
          
          <div className={`text-2xl  ${classificationInfo.color} mb-2`}>
            {classificationInfo.level}
          </div>
          
          <p className="text-lapis_lazuli-600 text-lg mb-4">
            {classificationInfo.description}
          </p>
          
          <div className="bg-white bg-opacity-70 rounded-lg p-4 inline-block">
            <p className="text-sm text-lapis_lazuli-600 mb-1">Confianza del modelo</p>
            <div className="flex items-center gap-2">
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-mint-500 to-teal-600 h-2 rounded-full transition-all duration-1000"
                  style={{ width: `${classificationInfo.confidence}%` }}
                />
              </div>
              <span className="text-lg  text-lapis_lazuli-700">
                {classificationInfo.confidence}%
              </span>
            </div>
          </div>
        </div>

        {/* Información adicional */}
        <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-6 mb-6">
          <h4 className=" text-teal-200 mb-3 flex items-center gap-2">
            <FaExclamationTriangle className="text-xl text-orange-500" />
            Información Importante
          </h4>
          <ul className="text-teal-300 text-sm space-y-1 leading-relaxed">
            <li>• Este análisis es solo una evaluación preliminar basada en IA</li>
            <li>• No reemplaza el diagnóstico médico profesional</li>
            <li>• Consulte con un radiólogo o neurólogo para interpretación definitiva</li>
            <li>• La confianza del modelo indica la certeza del algoritmo</li>
          </ul>
        </div>

        {/* Detalles técnicos */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
          <h5 className=" text-gray-700 mb-2 flex items-center gap-2">
            <FaImage className="text-sm" />
            Detalles del Análisis
          </h5>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">Clasificación:</span>
              <p className="text-gray-800">{result?.clase_predicha}</p>
            </div>
            <div>
              <span className="font-medium text-gray-600">Confianza:</span>
              <p className="text-gray-800">{((result?.confianza || 0) * 100).toFixed(2)}%</p>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
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