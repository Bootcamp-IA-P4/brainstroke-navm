import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-lapis_lazuli-600">
                🧠 StrokePredict
              </h1>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-500 hover:text-lapis_lazuli-600 transition-colors">
              Inicio
            </a>
            <a href="#assessment" className="text-gray-500 hover:text-lapis_lazuli-600 transition-colors">
              Evaluación
            </a>
            <a href="#history" className="text-gray-500 hover:text-lapis_lazuli-600 transition-colors">
              Historial
            </a>
            <a href="#about" className="text-gray-500 hover:text-lapis_lazuli-600 transition-colors">
              Acerca de
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;