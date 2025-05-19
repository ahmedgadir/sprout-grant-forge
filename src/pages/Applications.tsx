
import React from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';

const Applications: React.FC = () => {
  return (
    <div className="app-container">
      <Sidebar />
      
      <div className="main-content">
        <Navbar />
        
        <div className="dashboard-container p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-fundsprout-dark">Applications</h1>
            <Button className="bg-fundsprout-primary hover:bg-fundsprout-dark">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus mr-1"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              New Application
            </Button>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <div className="max-w-md mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text mx-auto mb-4 text-fundsprout-primary"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
              <h2 className="text-xl font-semibold mb-2">No Active Applications</h2>
              <p className="text-gray-600 mb-6">
                Start your grant application journey by selecting a grant opportunity from your matched grants.
              </p>
              <Button className="bg-fundsprout-primary hover:bg-fundsprout-dark">
                Explore Grant Matches
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
