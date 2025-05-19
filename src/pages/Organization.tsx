
import React from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { mockOrganization, mockUsers } from '../utils/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

const Organization: React.FC = () => {
  return (
    <div className="app-container">
      <Sidebar />
      
      <div className="main-content">
        <Navbar />
        
        <div className="dashboard-container p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-fundsprout-dark">Organization Profile</h1>
            <Button className="bg-fundsprout-primary hover:bg-fundsprout-dark">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil mr-1"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
              Edit Profile
            </Button>
          </div>
          
          <Tabs defaultValue="overview" className="mb-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="pt-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <div className="flex items-center mb-6">
                      <div className="w-16 h-16 rounded-lg bg-fundsprout-light flex items-center justify-center text-fundsprout-dark font-bold text-xl">
                        {mockOrganization.name.split(' ').map(word => word[0]).join('').slice(0, 2)}
                      </div>
                      <div className="ml-4">
                        <h2 className="text-xl font-semibold">{mockOrganization.name}</h2>
                        <p className="text-gray-600">{mockOrganization.location}</p>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-2">About</h3>
                      <p className="text-gray-700">{mockOrganization.description}</p>
                    </div>
                    
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-2">Mission</h3>
                      <p className="text-gray-700">{mockOrganization.mission}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-2">Contact Information</h3>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-globe text-gray-500"><circle cx="12" cy="12" r="10"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/><path d="M2 12h20"/></svg>
                            <a href={`https://${mockOrganization.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-fundsprout-primary">
                              {mockOrganization.website}
                            </a>
                          </li>
                          <li className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin text-gray-500"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                            <span>{mockOrganization.location}</span>
                          </li>
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-2">Organization Details</h3>
                        <ul className="space-y-2 text-gray-700">
                          <li className="flex items-center justify-between">
                            <span className="text-gray-600">Year Founded:</span> 
                            <span>{mockOrganization.yearFounded}</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-gray-600">Organization Size:</span> 
                            <span>{mockOrganization.size}</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-gray-600">Annual Budget:</span> 
                            <span>{mockOrganization.budget}</span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span className="text-gray-600">Tax ID:</span> 
                            <span>{mockOrganization.taxId}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="lg:col-span-1">
                  <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-lg font-medium mb-4">Profile Completion</h3>
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Basic Information</span>
                        <span className="text-sm font-medium text-green-600">Completed</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full">
                        <div className="h-full bg-green-500 rounded-full" style={{width: '100%'}}></div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Financial Documents</span>
                        <span className="text-sm font-medium text-green-600">Completed</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full">
                        <div className="h-full bg-green-500 rounded-full" style={{width: '100%'}}></div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Program Details</span>
                        <span className="text-sm font-medium text-yellow-600">75% Complete</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full">
                        <div className="h-full bg-yellow-500 rounded-full" style={{width: '75%'}}></div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Team Information</span>
                        <span className="text-sm font-medium text-fundsprout-dark">60% Complete</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full">
                        <div className="h-full bg-fundsprout-primary rounded-full" style={{width: '60%'}}></div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Impact Metrics</span>
                        <span className="text-sm font-medium text-red-600">Not Started</span>
                      </div>
                      <div className="h-2 w-full bg-gray-100 rounded-full">
                        <div className="h-full bg-red-500 rounded-full" style={{width: '0%'}}></div>
                      </div>
                    </div>
                    <Button className="w-full bg-fundsprout-primary hover:bg-fundsprout-dark">
                      Complete Your Profile
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="team" className="pt-4">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium">Team Members</h3>
                  <Button size="sm" className="bg-fundsprout-primary hover:bg-fundsprout-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus mr-1"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
                    Add Member
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockUsers.map((user) => (
                    <div key={user.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                          {user.name.split(' ').map(name => name[0]).join('')}
                        </div>
                        <div className="ml-3">
                          <h4 className="font-medium text-gray-900">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.role}</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-700 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail text-gray-500 mr-1"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                        <span>{user.email}</span>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-gray-50 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-plus text-gray-400 mb-2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="16" x2="22" y1="11" y2="11"/></svg>
                    <span className="text-sm font-medium text-gray-600">Add Team Member</span>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="documents" className="pt-4">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium">Organization Documents</h3>
                  <Button size="sm" className="bg-fundsprout-primary hover:bg-fundsprout-dark">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload mr-1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                    Upload Document
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center text-blue-600">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                        </div>
                        <div className="ml-3">
                          <h4 className="font-medium text-gray-900">Annual Report 2024</h4>
                          <p className="text-xs text-gray-500">PDF • 4.2 MB • Uploaded on May 10, 2025</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded bg-green-100 flex items-center justify-center text-green-600">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-spreadsheet"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M8 13h2"/><path d="M8 17h2"/><path d="M14 13h2"/><path d="M14 17h2"/></svg>
                        </div>
                        <div className="ml-3">
                          <h4 className="font-medium text-gray-900">Financial Statement 2024</h4>
                          <p className="text-xs text-gray-500">XLSX • 1.8 MB • Uploaded on May 5, 2025</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded bg-amber-100 flex items-center justify-center text-amber-600">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                        </div>
                        <div className="ml-3">
                          <h4 className="font-medium text-gray-900">501(c)(3) Determination Letter</h4>
                          <p className="text-xs text-gray-500">PDF • 0.5 MB • Uploaded on April 15, 2025</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded bg-purple-100 flex items-center justify-center text-purple-600">
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-image"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><circle cx="10" cy="13" r="2"/><path d="m20 17-1.09-1.09a2 2 0 0 0-2.82 0L10 22"/></svg>
                        </div>
                        <div className="ml-3">
                          <h4 className="font-medium text-gray-900">Program Photos 2024</h4>
                          <p className="text-xs text-gray-500">ZIP • 12.3 MB • Uploaded on April 2, 2025</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Organization;
