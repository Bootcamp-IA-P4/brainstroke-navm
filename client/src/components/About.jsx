import React from 'react';
// Importar las imágenes desde assets
import brainImage from '../assets/brain.jpg';
import medicalTeamImage from '../assets/cerebro2.webp';
import preventionImage from '../assets/cerebrotres.jpg';

const About = () => {
  return (
    <section id="about" className="py-20 bg-gradient-to-br from-white to-mint-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-caprasimo text-lapis_lazuli-600 mb-6">
            Acerca de StrokePredict
          </h2>
          <p className="text-xl font-raleway text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Una plataforma innovadora que utiliza inteligencia artificial para evaluar 
            el riesgo de accidente cerebrovascular, ayudando en la prevención y detección temprana.
          </p>
        </div>

        {/* Sección de imágenes */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
              <img 
                src={brainImage} 
                alt="Análisis cerebral con IA" 
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-caprasimo text-lapis_lazuli-600 mb-2">
                Tecnología Avanzada
              </h3>
              <p className="text-gray-600 font-raleway">
                Utilizamos algoritmos de machine learning entrenados con miles de casos clínicos
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
              <img 
                src={medicalTeamImage} 
                alt="Equipo médico profesional" 
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-caprasimo text-lapis_lazuli-600 mb-2">
                Respaldo Médico
              </h3>
              <p className="text-gray-600 font-raleway">
                Desarrollado en colaboración con especialistas en neurología y cardiología
              </p>
            </div>
          </div>

          <div className="text-center">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-4">
              <img 
                src={preventionImage} 
                alt="Prevención y cuidado de la salud" 
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-caprasimo text-lapis_lazuli-600 mb-2">
                Prevención Efectiva
              </h3>
              <p className="text-gray-600 font-raleway">
                La detección temprana puede reducir significativamente el riesgo de ACV
              </p>
            </div>
          </div>
        </div>

        {/* Bloque de texto extenso */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-caprasimo text-lapis_lazuli-600 mb-6 text-center">
              Nuestra Misión y Visión
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8 text-gray-700 leading-relaxed">
              <div>
                <h4 className="text-xl font-caprasimo text-teal-600 mb-4">Misión</h4>
                <p className="mb-4 font-raleway">
                  Democratizar el acceso a herramientas de evaluación de riesgo cardiovascular 
                  mediante el uso de inteligencia artificial, proporcionando información valiosa 
                  que pueda salvar vidas a través de la prevención y detección temprana.
                </p>
                <p className="mb-4 font-raleway">
                  Nuestro objetivo es crear un puente entre la tecnología avanzada y el cuidado 
                  de la salud, haciendo que la evaluación de riesgos sea accesible, rápida y confiable 
                  para cualquier persona, independientemente de su ubicación geográfica.
                </p>
              </div>
              
              <div>
                <h4 className="text-xl font-caprasimo text-teal-600 mb-4">Tecnología</h4>
                <p className="mb-4 font-raleway">
                  StrokePredict utiliza algoritmos de machine learning entrenados con extensas 
                  bases de datos médicas, incluyendo factores de riesgo como edad, género, 
                  hipertensión, diabetes, hábitos de vida y antecedentes médicos.
                </p>
                <p className="mb-4 font-raleway">
                  Nuestro modelo ha sido validado con datos clínicos reales y constantemente 
                  se actualiza para mejorar su precisión. Sin embargo, es importante recordar 
                  que esta herramienta es complementaria y nunca reemplaza la consulta médica profesional.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200">
              <h4 className="text-xl font-caprasimo text-lapis_lazuli-600 mb-4 text-center">
                Compromiso con la Precisión
              </h4>
              <p className="text-gray-700 font-raleway text-center max-w-3xl mx-auto">
                Trabajamos continuamente con profesionales de la salud para mejorar nuestros algoritmos. 
                Nuestro equipo incluye neurólogos, cardiólogos, científicos de datos e ingenieros de software 
                comprometidos con la excelencia en el cuidado preventivo de la salud.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;