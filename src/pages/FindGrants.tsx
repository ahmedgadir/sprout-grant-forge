
import React from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';

const FindGrants: React.FC = () => {
  return (
    <div className="app-container">
      <Sidebar />
      
      <div className="main-content">
        <Navbar />
        
        <div className="dashboard-container p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-fundsprout-dark">Find Grants</h1>
            <Button className="bg-fundsprout-primary hover:bg-fundsprout-dark">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-filter mr-1"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
              Filter Grants
            </Button>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="max-w-md mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search mx-auto mb-4 text-fundsprout-primary"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <h2 className="text-xl font-semibold mb-2">Discover Perfect Grant Matches</h2>
              <p className="text-gray-600 mb-6">
                Complete your organization profile to find grants that match your mission, programs, and goals.
              </p>
              <Button className="bg-fundsprout-primary hover:bg-fundsprout-dark">
                Complete Your Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FindGrants;
