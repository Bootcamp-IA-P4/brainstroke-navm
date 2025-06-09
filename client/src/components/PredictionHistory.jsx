import React, { useState, useEffect } from 'react';

const PredictionHistory = () => {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPredictions();
  }, []);

  const fetchPredictions = async () => {
    try {
      const response = await fetch('http://localhost:8000/users/');
      if (!response.ok) {
        throw new Error('Error al cargar las predicciones');
      }
      const data = await response.json();
      setPredictions(data.brain_stroke || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getRiskBadge = (resultado) => {
    const probability = parseFloat(resultado);
    if (probability < 0.3) {
      return (
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-mint-100 text-mint-700 border border-mint-200">
          🟢 Bajo
        </span>
      );
    } else if (probability < 0.7) {
      return (
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-cream-300 text-cream-100 border border-cream-400">
          🟡 Moderado
        </span>
      );
    } else {
      return (
        <span className="px-3 py-1 rounded-full text-sm font-medium bg-lapis_lazuli-100 text-lapis_lazuli-700 border border-lapis_lazuli-200">
          🔴 Alto
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
            <h2 className="text-3xl font-bold text-lapis_lazuli-600 mb-4">
              Historial de Predicciones
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-700">❌ Error: {error}</p>
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
          <h2 className="text-3xl font-bold text-lapis_lazuli-600 mb-4">
            📊 Historial de Predicciones
          </h2>
          <p className="text-teal-600 text-lg">
            Últimas evaluaciones realizadas con nuestro modelo de IA
          </p>
        </div>

        {predictions.length === 0 ? (
          <div className="text-center">
            <div className="card">
              <div className="text-6xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-lapis_lazuli-600 mb-2">
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
                        {formatDate(prediction.created_at)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {prediction.age} años
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {prediction.gender === "1" ? "👩 Femenino" : "👨 Masculino"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        <div className="flex flex-wrap gap-1">
                          {prediction.hypertension && (
                            <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                              HTA
                            </span>
                          )}
                          {prediction.heart_disease && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded">
                              Cardíaco
                            </span>
                          )}
                          {prediction.bmi > 30 && (
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded">
                              Obesidad
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {(parseFloat(prediction.resultado) * 100).toFixed(1)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getRiskBadge(prediction.resultado)}
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
            className="btn-secondary"
          >
            🔄 Actualizar Datos
          </button>
        </div>
      </div>
    </section>
  );
};

export default PredictionHistory;