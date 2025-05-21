
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import OnboardingWizard from '@/components/OnboardingWizard';

const Welcome: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user has completed onboarding
    const hasCompletedOnboarding = localStorage.getItem('onboarding-completed') === 'true';
    
    if (hasCompletedOnboarding) {
      // If onboarding is completed, redirect to discovery
      navigate('/discovery');
    }
  }, [navigate]);

  return <OnboardingWizard />;
};

export default Welcome;
