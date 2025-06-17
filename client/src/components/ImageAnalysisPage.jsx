import React, { useState } from 'react';
import ImageUpload from './ImageAnalysis/ImageUpload';
import ImageResults from './ImageAnalysis/ImageResults';

const ImageAnalysisPage = ({ onReset }) => {
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmitImage = async (imageFile) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Uploading image:', imageFile.name);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

      const formData = new FormData();
      formData.append('file', imageFile);

      const response = await fetch(`${apiUrl}/api/predict_image`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Received data:', data);
      setResult(data);
      setShowResults(true);
    } catch (error) {
      console.error('Error:', error);
      setError(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBackToUpload = () => {
    setShowResults(false);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-cream-900">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-4 mt-4">
          {error}
          <button 
            onClick={() => setError(null)}
            className="float-right text-red-700 hover:text-red-900"
          >
            ×
          </button>
        </div>
      )}
      
      {!showResults ? (
        <ImageUpload 
          onSubmit={handleSubmitImage} 
          loading={loading}
          onReset={onReset}
        />
      ) : (
        <div className="py-20">
          <ImageResults 
            result={result} 
            onReset={onReset}
            onBackToUpload={handleBackToUpload}
          />
        </div>
      )}
    </div>
  );
};

export default ImageAnalysisPage;