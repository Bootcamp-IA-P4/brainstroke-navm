import React, { useState, useRef } from 'react';
import { FaImage, FaUpload, FaExclamationTriangle, FaArrowLeft, FaTrash } from 'react-icons/fa';

const ImageUpload = ({ onSubmit, loading, onReset }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file) => {
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecciona un archivo de imagen válido.');
      return;
    }

    // Validar tamaño (máximo 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('El archivo es demasiado grande. Máximo 10MB.');
      return;
    }

    setSelectedImage(file);
    
    // Crear preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedImage) {
      onSubmit(selectedImage);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 text-lapis_lazuli-600 hover:text-mint-600 transition-colors mb-4"
          >
            <FaArrowLeft />
            Volver al inicio
          </button>
          <h2 className="text-3xl font-caprasimo text-lapis_lazuli-600 mb-4">
            Análisis de Accidente Cerebrovascular por Imagen
          </h2>
          <p className="text-lg font-raleway text-gray-600">
            Sube una imagen médica para obtener una evaluación mediante inteligencia artificial
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Zona de subida */}
            <div 
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all ${
                dragActive 
                  ? 'border-mint-500 bg-mint-50' 
                  : 'border-gray-300 hover:border-mint-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {!previewUrl ? (
                <>
                  <FaImage className="text-6xl text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">
                    Arrastra tu imagen aquí
                  </h3>
                  <p className="text-gray-500 mb-4">
                    o haz clic para seleccionar un archivo
                  </p>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="btn-secondary inline-flex items-center gap-2"
                  >
                    <FaUpload />
                    Seleccionar imagen
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                </>
              ) : (
                <div className="space-y-4">
                  <div className="relative inline-block">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-w-full max-h-64 rounded-lg shadow-md"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                    >
                      <FaTrash className="text-sm" />
                    </button>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-600 font-medium">{selectedImage?.name}</p>
                    <p className="text-gray-500 text-sm">
                      {(selectedImage?.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Información importante */}
            <div className="bg-teal-50 border-2 border-teal-200 rounded-xl p-6">
              <h4 className="font-semibold text-teal-800 mb-3 flex items-center gap-2">
                <FaExclamationTriangle className="text-teal-200" />
                Información importante
              </h4>
              <ul className="text-teal-200 text-sm space-y-1">
                <li>• Sube imágenes médicas de alta calidad para mejores resultados</li>
                <li>• Esta evaluación es solo informativa y no reemplaza la consulta médica</li>
                <li>• Los resultados se basan en algoritmos de inteligencia artificial</li>
                <li>• Formatos soportados: JPG, PNG, DICOM</li>
                <li>• Tamaño máximo: 10MB</li>
              </ul>
            </div>

            {/* Botón de envío */}
            <div className="text-center pt-6">
              <button 
                type="submit" 
                disabled={loading || !selectedImage}
                className="btn-primary text-lg px-12 py-4 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Analizando imagen...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <FaImage className="text-lg" />
                    Analizar Imagen
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ImageUpload;