import React from 'react';
import { FaUserMd, FaHistory, FaInfoCircle } from 'react-icons/fa';
import logoBrain from '../assets/logobrain.png';

const Header = ({ onLogoClick }) => {
  const handleHomeClick = () => {
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Reset app state if function provided
    if (onLogoClick) {
      onLogoClick();
    }
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <div 
              onClick={handleHomeClick}
              className="flex items-center space-x-3 cursor-pointer hover:opacity-90 transition-all duration-200"
            >
              <img 
                src={logoBrain} 
                alt="StrokePredict - Predicción de Accidente Cerebrovascular" 
                className="h-32 w-32"
              />
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a 
              href="#assessment" 
              className="flex items-center gap-2 text-gray-500 hover:text-lapis_lazuli-600 transition-colors font-medium"
            >
              <FaUserMd className="text-lg" />
              Evaluación
            </a>
            <a 
              href="#history" 
              className="flex items-center gap-2 text-gray-500 hover:text-lapis_lazuli-600 transition-colors font-medium"
            >
              <FaHistory className="text-lg" />
              Historial
            </a>
            <a 
              href="#about" 
              className="flex items-center gap-2 text-gray-500 hover:text-lapis_lazuli-600 transition-colors font-medium"
            >
              <FaInfoCircle className="text-lg" />
              Acerca de
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;