import React from 'react';

const Hero = ({ onStartAssessment }) => {
  return (
    <section id="home" className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Evalúa tu riesgo de
            <span className="text-primary-600"> Accidente Cerebrovascular</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Utiliza nuestro modelo de inteligencia artificial entrenado con datos médicos 
            para obtener una evaluación preliminar de tu riesgo de stroke.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={onStartAssessment}
              className="btn-primary text-lg px-8 py-3"
            >
              Comenzar Evaluación
            </button>
            <button className="btn-secondary text-lg px-8 py-3">
              Más Información
            </button>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">95%</div>
              <div className="text-gray-600">Precisión del modelo</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">10k+</div>
              <div className="text-gray-600">Evaluaciones realizadas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">24/7</div>
              <div className="text-gray-600">Disponible siempre</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;