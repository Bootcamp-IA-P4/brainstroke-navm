import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AssessmentForm from './components/AssessmentForm';
import Results from './components/Results';
import PredictionHistory from './components/PredictionHistory';
import About from './components/About';
import './index.css';

function App() {
  const [showAssessment, setShowAssessment] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleStartAssessment = () => {
    setShowAssessment(true);
    setTimeout(() => {
      document.getElementById('assessment')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  };

  const handleSubmitAssessment = async (formData) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Sending data:', formData);
      
      const response = await fetch('http://localhost:8000/api/predict', {
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
    setShowAssessment(false);
    setShowResults(false);
    setResult(null);
    setError(null);
  };

  // Función para el logo que resetea todo y vuelve al inicio
  const handleLogoClick = () => {
    handleReset();
  };

  return (
    <div className="min-h-screen bg-cream-900">
      <Header onLogoClick={handleLogoClick} />
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-4 mt-4">
          {error}
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
    </div>
  );
}

export default App;