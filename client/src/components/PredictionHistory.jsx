import React, { useState, useEffect } from 'react';
import { FaUser, FaUserTie, FaSync, FaChartLine, FaExclamationTriangle, FaCheckCircle, FaHeartbeat, FaWeight, FaSmoking } from 'react-icons/fa';
import { MdFemale, MdMale } from 'react-icons/md';

const PredictionHistory = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      setLoading(true);
      console.log('Fetching predictions...');
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
      const response = await fetch(`${apiUrl}/users/`);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Received data:', data);
      
      const predictionsData = data.brainstroke || [];
      setPredictions(predictionsData);
      
    } catch (err) {
      console.error('Error fetching predictions:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadge = (resultado) => {
    const probability = parseFloat(resultado);
    if (probability < 0.3) {
      return (
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-mint-100 text-mint-700 border border-mint-200 flex items-center gap-1">
          <FaCheckCircle className="text-xs" />
          Bajo
        </span>
      );
    } else if (probability < 0.7) {
      return (
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-700 border border-yellow-200 flex items-center gap-1">
          <FaExclamationTriangle className="text-xs" />
          Moderado
        </span>
      );
    } else {
      return (
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700 border border-red-200 flex items-center gap-1">
          <FaExclamationTriangle className="text-xs" />
          Alto
        </span>
      );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-caprasimo text-lapis_lazuli-600 mb-4">
              Historial de Predicciones
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">
                <FaExclamationTriangle className="inline mr-2" />
                Error: {error}
              </p>
              <button 
                onClick={fetchPredictions}
                className="mt-4 btn-secondary"
              >
                Reintentar
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="history" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-caprasimo text-lapis_lazuli-600 mb-4 flex items-center justify-center gap-3">
            <FaChartLine className="text-teal-600" />
            Historial de Predicciones
          </h2>
          <p className="text-teal-600 text-lg">
            Últimas evaluaciones realizadas con nuestro modelo de IA
          </p>
        </div>

        {predictions.length === 0 ? (
          <div className="text-center">
            <div className="card">
              <FaChartLine className="text-6xl text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl  text-lapis_lazuli-600 mb-2">
                No hay predicciones aún
              </h3>
              <p className="text-gray-600">
                Realiza tu primera evaluación para ver los resultados aquí
              </p>
            </div>
          </div>
        ) : (
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-lapis_lazuli-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-lapis_lazuli-700 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-lapis_lazuli-700 uppercase tracking-wider">
                      Edad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-lapis_lazuli-700 uppercase tracking-wider">
                      Género
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-lapis_lazuli-700 uppercase tracking-wider">
                      Condiciones
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-lapis_lazuli-700 uppercase tracking-wider">
                      Probabilidad
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-lapis_lazuli-700 uppercase tracking-wider">
                      Riesgo
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {predictions.slice(0, 10).map((prediction, index) => (
                    <tr key={prediction.id || index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {formatDate(prediction.Created_at)}
                      </td>
                      {/* ACTUALIZADO: Mostrar edad directamente sin conversión */}
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {prediction.Age} años
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          {prediction.Sex == "1" || prediction.Sex == 1 ? (
                            <>
                              <MdFemale className="text-pink-500" />
                              Femenino
                            </>
                          ) : (
                            <>
                              <MdMale className="text-blue-500" />
                              Masculino
                            </>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div className="flex flex-wrap gap-1">
                          {prediction.HighBP == 1 && (
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded flex items-center gap-1">
                              <FaHeartbeat className="text-xs" />
                              HTA
                            </span>
                          )}
                          {prediction.HeartDiseaseorAttack == 1 && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded flex items-center gap-1">
                              <FaHeartbeat className="text-xs" />
                              Cardíaco
                            </span>
                          )}
                          {prediction.BMI > 30 && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded flex items-center gap-1">
                              <FaWeight className="text-xs" />
                              Obesidad
                            </span>
                          )}
                          {prediction.Smoker == 1 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded flex items-center gap-1">
                              <FaSmoking className="text-xs" />
                              Fumador
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {(parseFloat(prediction.Resultado) * 100).toFixed(1)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getRiskBadge(prediction.Resultado)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {predictions.length > 10 && (
              <div className="bg-gray-50 px-6 py-3 text-center">
                <p className="text-sm text-gray-600">
                  Mostrando las últimas 10 predicciones de {predictions.length} totales
                </p>
              </div>
            )}
          </div>
        )}

        <div className="mt-8 text-center">
          <button 
            onClick={fetchPredictions}
            className="btn-secondary flex items-center gap-2 mx-auto"
          >
            <FaSync className="text-sm" />
            Actualizar Datos
          </button>
        </div>
      </div>
    </section>
  );
};

export default PredictionHistory;