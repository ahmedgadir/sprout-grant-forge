
import React from 'react';
import { mockOrganization } from '../utils/mockData';

const DashboardHeader: React.FC = () => {
  return (
    <div className="mb-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome back, Maria</h1>
          <p className="text-gray-600 mt-1">Here's what's happening with {mockOrganization.name} today.</p>
        </div>
        <div>
          <button className="bg-fundsprout-primary text-white px-4 py-2 rounded-lg hover:bg-fundsprout-dark transition-colors flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus"><line x1="12" x2="12" y1="5" y2="19"/><line x1="5" x2="19" y1="12" y2="12"/></svg>
            <span>New Application</span>
          </button>
        </div>
      </div>

      {/* Stats summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatCard 
          label="Matched Grants" 
          value="8"
          subtext="High match rate (>70%)"
          iconColor="#2C6E49"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-target"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>}
        />
        <StatCard 
          label="Grants in Progress" 
          value="3"
          subtext="Applications being drafted"
          iconColor="#4C956C"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>}
        />
        <StatCard 
          label="Submitted" 
          value="12"
          subtext="Awaiting decision"
          iconColor="#1B4332"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>}
        />
        <StatCard 
          label="Funding Won" 
          value="$725K"
          subtext="Total from 5 grants"
          iconColor="#4C956C"
          icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-badge-dollar-sign"><path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>}
        />
      </div>
    </div>
  );
};

interface StatCardProps {
  label: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
  iconColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, subtext, icon, iconColor }) => {
  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 card-shadow">
      <div className="flex items-center mb-4">
        <div className="w-9 h-9 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: `${iconColor}15` }}>
          <div className="text-xl" style={{ color: iconColor }}>{icon}</div>
        </div>
        <div>
          <div className="text-sm font-medium text-gray-500">{label}</div>
          <div className="text-xl font-bold">{value}</div>
        </div>
      </div>
      <div className="text-xs text-gray-500">{subtext}</div>
    </div>
  );
};

export default DashboardHeader;
