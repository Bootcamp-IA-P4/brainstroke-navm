import React, { useState } from 'react';
import { FaBars, FaTimes, FaChartLine, FaInfoCircle, FaChevronDown, FaClipboardList, FaImage } from 'react-icons/fa';
import logoBrain from '../assets/logobrain.png';

const Header = ({ onLogoClick, onStartAssessment, onStartImageAnalysis }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnalysisDropdownOpen, setIsAnalysisDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleAnalysisDropdown = () => {
    setIsAnalysisDropdownOpen(!isAnalysisDropdownOpen);
  };

  const handleLogoClick = () => {
    setIsMenuOpen(false);
    setIsAnalysisDropdownOpen(false);
    onLogoClick();
  };

  const handleStartAssessment = () => {
    setIsMenuOpen(false);
    setIsAnalysisDropdownOpen(false);
    onStartAssessment();
  };

  const handleStartImageAnalysis = () => {
    setIsMenuOpen(false);
    setIsAnalysisDropdownOpen(false);
    onStartImageAnalysis();
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-36 py-4">
          {/* Logo */}
          <button 
            onClick={handleLogoClick}
            className="flex items-center gap-4 hover:opacity-80 transition-opacity cursor-pointer group"
          >
            <div className="flex items-center justify-center">
              <img 
                src={logoBrain} 
                alt="StrokePredict Logo" 
                className="w-32 h-32 object-contain group-hover:scale-105 transition-transform"
              />
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Dropdown de Análisis */}
            <div className="relative">
              <button
                onClick={toggleAnalysisDropdown}
                className="nav-link flex items-center gap-2 text-lg hover:text-mint-600 transition-colors"
              >
                <FaClipboardList className="text-base" />
                Análisis
                <FaChevronDown className={`text-sm transition-transform ${isAnalysisDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isAnalysisDropdownOpen && (
                <div className="absolute top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <button
                    onClick={handleStartAssessment}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-lapis_lazuli-600 hover:text-mint-600"
                  >
                    <FaClipboardList className="text-base" />
                    <div>
                      <div className="font-medium">Análisis por Datos</div>
                      <div className="text-sm text-gray-500">Formulario médico</div>
                    </div>
                  </button>
                  <button
                    onClick={handleStartImageAnalysis}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 text-lapis_lazuli-600 hover:text-mint-600 border-t border-gray-100"
                  >
                    <FaImage className="text-base" />
                    <div>
                      <div className="font-medium">Análisis por Imagen</div>
                      <div className="text-sm text-gray-500">Subir imagen médica</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <a 
              href="#history" 
              className="nav-link flex items-center gap-2 text-lg"
            >
              <FaChartLine className="text-base" />
              Historial
            </a>
            <a 
              href="#about" 
              className="nav-link flex items-center gap-2 text-lg"
            >
              <FaInfoCircle className="text-base" />
              Acerca de
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-lapis_lazuli-600 hover:text-mint-600 transition-colors"
            >
              {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-2 pt-4 pb-6 space-y-2">
              {/* Análisis por Datos */}
              <button 
                onClick={handleStartAssessment}
                className="w-full text-left px-4 py-3 text-lapis_lazuli-600 hover:text-mint-600 transition-colors flex items-center gap-3 text-lg"
              >
                <FaClipboardList className="text-base" />
                Análisis por Datos
              </button>
              
              {/* Análisis por Imagen */}
              <button 
                onClick={handleStartImageAnalysis}
                className="w-full text-left px-4 py-3 text-lapis_lazuli-600 hover:text-mint-600 transition-colors flex items-center gap-3 text-lg"
              >
                <FaImage className="text-base" />
                Análisis por Imagen
              </button>

              <a 
                href="#history" 
                className="block px-4 py-3 text-lapis_lazuli-600 hover:text-mint-600 transition-colors flex items-center gap-3 text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaChartLine className="text-base" />
                Historial
              </a>
              <a 
                href="#about" 
                className="block px-4 py-3 text-lapis_lazuli-600 hover:text-mint-600 transition-colors flex items-center gap-3 text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaInfoCircle className="text-base" />
                Acerca de
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Overlay para cerrar dropdown */}
      {isAnalysisDropdownOpen && (
        <div 
          className="fixed inset-0 z-5" 
          onClick={() => setIsAnalysisDropdownOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;