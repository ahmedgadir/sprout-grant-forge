
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { mockReports, Report } from '../utils/mockData';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Reports: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();
  
  // Sample chart data
  const fundingData = [
    { name: 'Jan', amount: 0 },
    { name: 'Feb', amount: 75000 },
    { name: 'Mar', amount: 75000 },
    { name: 'Apr', amount: 75000 },
    { name: 'May', amount: 175000 },
    { name: 'Jun', amount: 175000 },
    { name: 'Jul', amount: 175000 },
    { name: 'Aug', amount: 175000 },
    { name: 'Sep', amount: 295000 },
    { name: 'Oct', amount: 295000 },
    { name: 'Nov', amount: 295000 },
    { name: 'Dec', amount: 450000 },
  ];
  
  const categoryData = [
    { name: 'Community Development', value: 250000 },
    { name: 'Education', value: 120000 },
    { name: 'Technology', value: 80000 },
    { name: 'Health', value: 200000 },
    { name: 'Environment', value: 75000 },
  ];
  
  const COLORS = ['#2C6E49', '#4C956C', '#87B38D', '#A0D1B0', '#D8F3DC'];
  
  // Filter reports
  const getReportsByStatus = (status: string) => {
    return mockReports.filter(report => report.status === status);
  };
  
  const getReportStatusBadge = (status: string) => {
    switch(status) {
      case 'upcoming':
        return <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">Upcoming</span>;
      case 'submitted':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Submitted</span>;
      case 'approved':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Approved</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">{status}</span>;
    }
  };
  
  const getReportTypeBadge = (type: string) => {
    switch(type) {
      case 'progress':
        return <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Progress</span>;
      case 'financial':
        return <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Financial</span>;
      case 'compliance':
        return <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">Compliance</span>;
      case 'final':
        return <span className="px-2 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">Final</span>;
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">{type}</span>;
    }
  };

  return (
    <div className="app-container">
      <Sidebar />
      
      <div className="main-content">
        <Navbar />
        
        <div className="dashboard-container p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-fundsprout-dark">Reports & Analytics</h1>
            <Button className="bg-fundsprout-primary hover:bg-fundsprout-dark">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-download mr-1"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
              Export Reports
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList>
              <TabsTrigger value="overview">Funding Overview</TabsTrigger>
              <TabsTrigger value="compliance">Compliance Reports</TabsTrigger>
              <TabsTrigger value="progress">Grant Progress</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Total Funding</CardTitle>
                    <CardDescription>Awarded grant funds in 2025</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-fundsprout-dark">$450,000</div>
                    <p className="text-sm text-green-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up mr-1"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                      28% increase from last year
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Grants Awarded</CardTitle>
                    <CardDescription>Number of successful grants</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-fundsprout-dark">5</div>
                    <p className="text-sm text-green-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up mr-1"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                      2 more than last year
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Success Rate</CardTitle>
                    <CardDescription>Grant application success</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-fundsprout-dark">72%</div>
                    <p className="text-sm text-green-600 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up mr-1"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                      15% improvement from last year
                    </p>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <Card className="lg:col-span-3">
                  <CardHeader>
                    <CardTitle>Funding Awarded Over Time</CardTitle>
                    <CardDescription>Cumulative grant funding in 2025</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={fundingData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                          <Legend />
                          <Bar dataKey="amount" name="Funding Amount" fill="#2C6E49" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle>Funding by Category</CardTitle>
                    <CardDescription>Distribution of grants by focus area</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="compliance" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Reports</CardTitle>
                  <CardDescription>Required documentation for active grants</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium text-gray-900 mb-4">Upcoming Reports</h3>
                      {getReportsByStatus('upcoming').length === 0 ? (
                        <p className="text-gray-500">No upcoming reports.</p>
                      ) : (
                        <div className="space-y-4">
                          {getReportsByStatus('upcoming').map((report) => (
                            <div key={report.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium text-gray-900">{report.title}</h4>
                                    {getReportTypeBadge(report.type)}
                                  </div>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {report.grantTitle}
                                  </p>
                                </div>
                                <div className="text-sm">
                                  <span className="text-red-600 font-medium">
                                    Due: {new Date(report.dueDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}
                                  </span>
                                </div>
                              </div>
                              <div className="mt-3 flex justify-end">
                                <Button size="sm" className="bg-fundsprout-primary hover:bg-fundsprout-dark">
                                  Start Report
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-4">Submitted Reports</h3>
                      {getReportsByStatus('submitted').length === 0 ? (
                        <p className="text-gray-500">No submitted reports.</p>
                      ) : (
                        <div className="space-y-4">
                          {getReportsByStatus('submitted').map((report) => (
                            <div key={report.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium text-gray-900">{report.title}</h4>
                                    {getReportTypeBadge(report.type)}
                                  </div>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {report.grantTitle}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  {getReportStatusBadge(report.status)}
                                  <span className="text-sm text-gray-600">
                                    {report.submissionDate && new Date(report.submissionDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}
                                  </span>
                                </div>
                              </div>
                              <div className="mt-3 flex justify-end">
                                <Button variant="outline" size="sm">
                                  View Report
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h3 className="font-medium text-gray-900 mb-4">Approved Reports</h3>
                      {getReportsByStatus('approved').length === 0 ? (
                        <p className="text-gray-500">No approved reports.</p>
                      ) : (
                        <div className="space-y-4">
                          {getReportsByStatus('approved').map((report) => (
                            <div key={report.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow cursor-pointer">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <h4 className="font-medium text-gray-900">{report.title}</h4>
                                    {getReportTypeBadge(report.type)}
                                  </div>
                                  <p className="text-sm text-gray-600 mt-1">
                                    {report.grantTitle}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2">
                                  {getReportStatusBadge(report.status)}
                                  <span className="text-sm text-gray-600">
                                    {report.submissionDate && new Date(report.submissionDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}
                                  </span>
                                </div>
                              </div>
                              <div className="mt-3 flex justify-end">
                                <Button variant="outline" size="sm">
                                  View Report
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="progress" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Grant Progress Tracking</CardTitle>
                  <CardDescription>Performance metrics for active grants</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border border-gray-200 rounded-lg p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-gray-900">Community Development Block Grant</h3>
                          <p className="text-sm text-gray-600">U.S. Department of Housing</p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">On Track</span>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Budget Utilization</span>
                            <span className="font-medium">65%</span>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full">
                            <div className="h-full bg-fundsprout-primary rounded-full" style={{width: '65%'}}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Timeline Progress</span>
                            <span className="font-medium">50%</span>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full">
                            <div className="h-full bg-fundsprout-primary rounded-full" style={{width: '50%'}}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Milestones Completed</span>
                            <span className="font-medium">4/8</span>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full">
                            <div className="h-full bg-fundsprout-primary rounded-full" style={{width: '50%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-gray-900">Arts and Humanities Grant</h3>
                          <p className="text-sm text-gray-600">National Endowment for the Arts</p>
                        </div>
                        <span className="px-2 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">Needs Attention</span>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Budget Utilization</span>
                            <span className="font-medium">45%</span>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full">
                            <div className="h-full bg-fundsprout-primary rounded-full" style={{width: '45%'}}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Timeline Progress</span>
                            <span className="font-medium">60%</span>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full">
                            <div className="h-full bg-fundsprout-primary rounded-full" style={{width: '60%'}}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Milestones Completed</span>
                            <span className="font-medium">3/5</span>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full">
                            <div className="h-full bg-fundsprout-primary rounded-full" style={{width: '60%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-5">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-medium text-gray-900">Community Innovation Challenge</h3>
                          <p className="text-sm text-gray-600">Robertson Foundation</p>
                        </div>
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Excellent</span>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Budget Utilization</span>
                            <span className="font-medium">85%</span>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full">
                            <div className="h-full bg-fundsprout-primary rounded-full" style={{width: '85%'}}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Timeline Progress</span>
                            <span className="font-medium">90%</span>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full">
                            <div className="h-full bg-fundsprout-primary rounded-full" style={{width: '90%'}}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Milestones Completed</span>
                            <span className="font-medium">9/10</span>
                          </div>
                          <div className="h-2 w-full bg-gray-100 rounded-full">
                            <div className="h-full bg-fundsprout-primary rounded-full" style={{width: '90%'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Reports;
