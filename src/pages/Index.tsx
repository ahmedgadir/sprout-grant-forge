
import React from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import DashboardHeader from '@/components/DashboardHeader';
import MatchedGrants from '@/components/MatchedGrants';
import RecentActivity from '@/components/RecentActivity';

const Index: React.FC = () => {
  return (
    <div className="app-container flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="main-content flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <div className="dashboard-container p-6 overflow-y-auto">
          <DashboardHeader />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2">
              <MatchedGrants />
            </div>
            
            <div>
              <RecentActivity />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
