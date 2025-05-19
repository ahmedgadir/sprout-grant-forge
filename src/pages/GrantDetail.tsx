
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { mockGrants } from '@/utils/mockData';

const GrantDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the grant with the matching ID
  const grant = mockGrants.find(g => g.id === id);
  
  if (!grant) {
    return (
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <div className="dashboard-container p-6">
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-600 mb-4">Grant not found</p>
              <Button onClick={() => navigate('/')} className="bg-fundsprout-primary hover:bg-fundsprout-dark">
                Return to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="app-container">
      <Sidebar />
      
      <div className="main-content">
        <Navbar />
        
        <div className="dashboard-container p-6">
          <div className="mb-4">
            <button 
              onClick={() => navigate('/')} 
              className="text-gray-600 flex items-center hover:text-fundsprout-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left mr-1"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
              Back to Dashboard
            </button>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mr-4">
                  <div className="text-sm font-medium text-gray-500">
                    {grant.organization.split(' ').map(word => word[0]).join('').slice(0, 2)}
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-fundsprout-dark mb-1">{grant.title}</h1>
                  <p className="text-gray-600">{grant.organization}</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="relative h-12 w-12 mr-3">
                  <svg className="h-12 w-12" viewBox="0 0 36 36">
                    <circle cx="18" cy="18" r="16" stroke="#E5E7EB" strokeWidth="3" fill="none"></circle>
                    <circle
                      cx="18"
                      cy="18"
                      r="16"
                      stroke="#2C6E49"
                      strokeWidth="3"
                      fill="none"
                      strokeDasharray={`${(grant.matchPercentage / 100) * 100} 100`}
                      strokeDashoffset="25"
                      strokeLinecap="round"
                    ></circle>
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                    {grant.matchPercentage}%
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Match score</div>
                  <div className="font-medium text-fundsprout-dark">Great fit</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="border border-gray-100 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Award Amount</div>
                <div className="font-semibold text-gray-900">{grant.amount}</div>
              </div>
              <div className="border border-gray-100 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Application Deadline</div>
                <div className="font-semibold text-gray-900">{new Date(grant.deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
              </div>
              <div className="border border-gray-100 rounded-lg p-4">
                <div className="text-xs text-gray-500 mb-1">Category</div>
                <div className="font-semibold text-gray-900 flex flex-wrap gap-1">
                  {grant.tags.map((tag, i) => (
                    <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-fundsprout-light text-fundsprout-dark">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-2">Description</h2>
              <p className="text-gray-700">{grant.description}</p>
              <p className="text-gray-700 mt-4">This grant aims to support organizations that are addressing critical community needs through innovative approaches. The funding can be used for program development, capacity building, and expanding outreach to underserved populations.</p>
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={() => navigate(`/apply/${grant.id}`)} 
                className="bg-fundsprout-primary hover:bg-fundsprout-dark"
              >
                Start Application
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-semibold mb-4">Why This Is a Good Match</h2>
            <div className="space-y-4">
              <div className="flex">
                <div className="mr-3 text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <p className="font-medium">Your organization's focus areas align with this grant's priorities</p>
                  <p className="text-sm text-gray-600">Youth education and community development are key priorities for this funder</p>
                </div>
              </div>
              <div className="flex">
                <div className="mr-3 text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <p className="font-medium">Your organization's size matches the funder's typical grantees</p>
                  <p className="text-sm text-gray-600">This funder typically supports organizations with annual budgets under $5 million</p>
                </div>
              </div>
              <div className="flex">
                <div className="mr-3 text-green-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <p className="font-medium">Your organization has the required track record</p>
                  <p className="text-sm text-gray-600">Your 3+ years of operation meets their minimum requirement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrantDetail;
