
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingWizard from '@/components/OnboardingWizard';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try {
      // Check if the user has completed onboarding
      const hasCompletedOnboarding = localStorage.getItem('onboarding-completed') === 'true';
      
      if (hasCompletedOnboarding) {
        // If onboarding is completed, redirect to discovery
        navigate('/discovery');
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      // If there's an error, stay on welcome page
    }
  }, [navigate]);

  // Add error boundary behavior
  try {
    return <OnboardingWizard />;
  } catch (error) {
    console.error('Error rendering OnboardingWizard:', error);
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to Fundsprout</h1>
          <p className="text-gray-600 mb-4">Loading your experience...</p>
          <button 
            onClick={() => navigate('/discovery')} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Continue to Discovery
          </button>
        </div>
      </div>
    );
  }
};

export default Welcome;
