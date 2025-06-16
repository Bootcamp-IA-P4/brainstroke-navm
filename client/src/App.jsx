import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AssessmentForm from './components/AssessmentForm';
import Results from './components/Results';
import PredictionHistory from './components/PredictionHistory';
import About from './components/About';
import Footer from './components/Footer';
import ImageAnalysisPage from './components/ImageAnalysisPage';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'data-analysis', 'image-analysis'
  const [showAssessment, setShowAssessment] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleStartAssessment = () => {
    setCurrentPage('data-analysis');
    setShowAssessment(true);
    setTimeout(() => {
      document.getElementById('assessment')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  };

  const handleStartImageAnalysis = () => {
    setCurrentPage('image-analysis');
    // Scroll al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitAssessment = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Sending data:', formData);
      const apiUrl = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

      const response = await fetch(`${apiUrl}/api/predict`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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

  const handleReset = () => {
    setCurrentPage('home');
    setShowAssessment(false);
    setShowResults(false);
    setResult(null);
    setError(null);
    // Scroll suave al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogoClick = () => {
    handleReset();
  };

  // Renderizar página de análisis por imagen
  if (currentPage === 'image-analysis') {
    return (
      <div className="min-h-screen bg-cream-900">
        <Header 
          onLogoClick={handleLogoClick} 
          onStartAssessment={handleStartAssessment}
          onStartImageAnalysis={handleStartImageAnalysis}
        />
        <ImageAnalysisPage onReset={handleReset} />
        <Footer onLogoClick={handleLogoClick} />
      </div>
    );
  }

  // Página principal con análisis por datos
  return (
    <div className="min-h-screen bg-cream-900">
      <Header 
        onLogoClick={handleLogoClick} 
        onStartAssessment={handleStartAssessment}
        onStartImageAnalysis={handleStartImageAnalysis}
      />
      
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
        <>
          <Hero onStartAssessment={handleStartAssessment} />
          {showAssessment && (
            <AssessmentForm 
              onSubmit={handleSubmitAssessment} 
              loading={loading}
            />
          )}
          <PredictionHistory />
          <About />
        </>
      ) : (
        <div className="py-20">
          <Results result={result} onReset={handleReset} />
        </div>
      )}
      
      <Footer onLogoClick={handleLogoClick} />
    </div>
  );
}

export default App;