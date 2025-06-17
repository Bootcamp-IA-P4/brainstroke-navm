import React from 'react';
import { FaHeart, FaGithub, FaLinkedin, FaEnvelope, FaChartLine, FaInfoCircle } from 'react-icons/fa';
import logoBrain from '../assets/logobrain.png';

const Footer = ({ onLogoClick }) => {
  return (
    <footer className="bg-lapis_lazuli-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Logo y descripción */}
          <div className="space-y-4">
            <button 
              onClick={onLogoClick}
              className="flex items-center gap-3 text-white hover:text-mint-300 transition-colors cursor-pointer group"
            >
              <div className="w-12 h-12 flex items-center justify-center">
                <img 
                  src={logoBrain} 
                  alt="StrokePredict Logo" 
                  className="w-32 h-32 object-contain group-hover:scale-110 transition-transform"
                />
              </div>
            
            </button>
            <p className="text-lapis_lazuli-200 text-sm leading-relaxed max-w-sm">
              Plataforma de evaluación de riesgo cardiovascular impulsada por inteligencia artificial 
              para la prevención y detección temprana de accidentes cerebrovasculares.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div className="space-y-4">
            <h4 className="text-lg font-caprasimo text-lapis_lazuli-300">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#history" 
                  className="text-lapis_lazuli-200 hover:text-mint-300 transition-colors text-sm flex items-center gap-2"
                >
                  <FaChartLine className="text-xs" />
                  Historial
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="text-lapis_lazuli-200 hover:text-mint-300 transition-colors text-sm flex items-center gap-2"
                >
                  <FaInfoCircle className="text-xs" />
                  Acerca de
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto e información */}
          <div className="space-y-4">
            <h4 className="text-lg font-caprasimo text-mint-200">Contacto</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-lapis_lazuli-200">
                <FaEnvelope className="text-mint-400" />
                <span>info@strokepredict.com</span>
              </div>
              <div className="flex items-center gap-3">
                <a 
                  href="https://github.com/Bootcamp-IA-P4/brainstroke-navm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lapis_lazuli-200 hover:text-mint-300 transition-colors"
                >
                  <FaGithub className="text-xl" />
                </a>
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-lapis_lazuli-200 hover:text-mint-300 transition-colors"
                >
                  <FaLinkedin className="text-xl" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-lapis_lazuli-600 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-lapis_lazuli-300 text-sm">
              © 2024 StrokePredict. Todos los derechos reservados.
            </p>
            <div className="flex items-center gap-1 text-lapis_lazuli-300 text-sm">
              <span>Hecho con</span>
              <FaHeart className="text-red-400 text-xs" />
              <span>para salvar vidas</span>
            </div>
          </div>
          
          {/* Disclaimer médico */}
          <div className="mt-4 p-4 bg-lapis_lazuli-900 rounded-lg">
            <p className="text-lapis_lazuli-200 text-xs leading-relaxed text-center">
              <strong className="text-mint-300">Aviso Importante:</strong> Esta herramienta es solo para fines informativos y educativos. 
              No reemplaza el consejo, diagnóstico o tratamiento médico profesional. 
              Siempre consulte con un profesional de la salud calificado para cualquier pregunta sobre su condición médica.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;