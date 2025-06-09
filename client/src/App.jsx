import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AssessmentForm from './components/AssessmentForm';
import Results from './components/Results';
import './index.css';

function App() {
  const [showAssessment, setShowAssessment] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleStartAssessment = () => {
    setShowAssessment(true);
    setTimeout(() => {
      document.getElementById('assessment').scrollIntoView({ 
        behavior: 'smooth' 
      });
    }, 100);
  };

  const handleSubmitAssessment = async (formData) => {
    setLoading(true);
    try {
      // Aquí harás la llamada a tu API de FastAPI
      const response = await fetch('/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      setResult(data);
      setShowResults(true);
    } catch (error) {
      console.error('Error:', error);
      // Simulación temporal para desarrollo
      setResult({
        probability: Math.random() * 0.8 + 0.1,
        factors: ['edad', 'hipertensión']
      });
      setShowResults(true);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setShowAssessment(false);
    setShowResults(false);
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {!showResults ? (
        <>
          <Hero onStartAssessment={handleStartAssessment} />
          {showAssessment && (
            <AssessmentForm 
              onSubmit={handleSubmitAssessment} 
              loading={loading}
            />
          )}
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