
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { mockApplications, Application } from '../utils/mockData';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const Applications: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const navigate = useNavigate();
  
  const filteredApplications = selectedTab === 'all' 
    ? mockApplications 
    : mockApplications.filter(app => app.status === selectedTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-amber-100 text-amber-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'awarded': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <Tabs 
              defaultValue="all" 
              className="mb-6"
              value={selectedTab}
              onValueChange={setSelectedTab}
            >
              <TabsList>
                <TabsTrigger value="all">All Applications</TabsTrigger>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
                <TabsTrigger value="submitted">Submitted</TabsTrigger>
                <TabsTrigger value="awarded">Awarded</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
            </Tabs>
            
            {filteredApplications.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <div className="max-w-md mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text mx-auto mb-4 text-fundsprout-primary"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                  <h2 className="text-xl font-semibold mb-2">No Applications Found</h2>
                  <p className="text-gray-600 mb-6">
                    Start your grant application journey by selecting a grant opportunity from your matched grants.
                  </p>
                  <Button className="bg-fundsprout-primary hover:bg-fundsprout-dark">
                    Explore Grant Matches
                  </Button>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="text-sm text-gray-700 border-b border-gray-200">
                    <tr>
                      <th className="text-left pb-3 font-medium">Grant</th>
                      <th className="text-left pb-3 font-medium">Organization</th>
                      <th className="text-left pb-3 font-medium">Due Date</th>
                      <th className="text-left pb-3 font-medium">Amount</th>
                      <th className="text-left pb-3 font-medium">Status</th>
                      <th className="text-left pb-3 font-medium">Progress</th>
                      <th className="text-right pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map((application) => (
                      <tr key={application.id} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/applications/${application.id}`)}>
                        <td className="py-4 pr-8">
                          <div className="font-medium text-fundsprout-dark">{application.grantTitle}</div>
                        </td>
                        <td className="py-4 pr-8">{application.organization}</td>
                        <td className="py-4 pr-8">
                          <div className="text-sm">
                            {new Date(application.dueDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}
                          </div>
                        </td>
                        <td className="py-4 pr-8">{application.amount}</td>
                        <td className="py-4 pr-8">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 pr-8 w-36">
                          <div className="flex items-center space-x-2">
                            <Progress value={application.progress} className="h-2" />
                            <span className="text-xs text-gray-500">{application.progress}%</span>
                          </div>
                        </td>
                        <td className="py-4 text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/applications/${application.id}`);
                            }} 
                            className="hover:bg-fundsprout-light hover:text-fundsprout-dark"
                          >
                            {application.status === 'draft' ? 'Continue' : 'View'}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
