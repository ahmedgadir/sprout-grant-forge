
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { mockGrants, Grant } from '@/utils/mockData';
import { useNavigate } from 'react-router-dom';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Discovery: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('relevance');

  // Add some new grant categories for the discovery feed
  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'recommended', name: 'Recommended' },
    { id: 'education', name: 'Education' },
    { id: 'environment', name: 'Environment' },
    { id: 'health', name: 'Health & Wellness' },
    { id: 'arts', name: 'Arts & Culture' },
    { id: 'community', name: 'Community Development' }
  ];

  // Enhanced mock data for the discovery feed
  const discoveryGrants = mockGrants.map(grant => {
    // Add some random AI-generated insights to each grant
    const insights = [
      "Strong alignment with your mission statement",
      "Similar organizations have been successful with this funder",
      "Your recent programs match this funder's priorities",
      "Your organizational size is within their typical range",
      "Your geographic focus aligns with this opportunity"
    ];
    
    // Randomly select 1-3 insights for each grant
    const selectedInsights = insights
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1);
    
    return {
      ...grant,
      insights: selectedInsights,
      daysLeft: Math.floor(Math.random() * 30) + 1,
      newOpportunity: Math.random() > 0.7
    };
  });

  // Filter grants based on search, category, and other filters
  const filteredGrants = discoveryGrants.filter(grant => {
    const matchesSearch = searchTerm === '' || 
      grant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grant.organization.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = selectedCategory === 'all' || 
      (selectedCategory === 'recommended' && grant.matchPercentage > 85) ||
      grant.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase());
    
    return matchesSearch && matchesCategory;
  });

  // Sort grants based on selected filter
  const sortedGrants = [...filteredGrants].sort((a, b) => {
    switch (selectedFilter) {
      case 'relevance':
        return b.matchPercentage - a.matchPercentage;
      case 'deadline':
        return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
      case 'amount':
        const amountA = parseInt(a.amount.replace(/[^0-9]/g, ''));
        const amountB = parseInt(b.amount.replace(/[^0-9]/g, ''));
        return amountB - amountA;
      default:
        return 0;
    }
  });

  return (
    <div className="app-container flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="main-content flex-1 flex flex-col overflow-hidden">
        <Navbar />
        
        <div className="p-6 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-fundsprout-dark">Grant Discovery</h1>
            <p className="text-gray-600">Find grant opportunities tailored to your organization</p>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Input
                className="pl-10 pr-4 py-3 rounded-xl"
                placeholder="Search for grants by keyword, category, or funder..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <Tabs defaultValue="all" className="w-full max-w-md">
              <TabsList className="w-full">
                {categories.slice(0, 4).map(category => (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
                <TabsTrigger value="more">More</TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex gap-2">
              <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="relevance">Best Match</SelectItem>
                  <SelectItem value="deadline">Deadline (Soonest)</SelectItem>
                  <SelectItem value="amount">Amount (Highest)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedGrants.map((grant) => (
              <DiscoveryCard 
                key={grant.id} 
                grant={grant} 
                onClick={() => navigate(`/grants/${grant.id}`)} 
              />
            ))}
          </div>
          
          {sortedGrants.length === 0 && (
            <div className="text-center py-12">
              <div className="h-20 w-20 mx-auto mb-4 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-x"><path d="m13.5 8.5-5 5"/><path d="m8.5 8.5 5 5"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
              <h2 className="text-xl font-semibold mb-2">No Matching Grants</h2>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                We couldn't find any grants matching your criteria. Try adjusting your search terms or filters.
              </p>
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface DiscoveryCardProps {
  grant: Grant & { 
    insights?: string[];
    daysLeft?: number;
    newOpportunity?: boolean;
  };
  onClick: () => void;
}

const DiscoveryCard: React.FC<DiscoveryCardProps> = ({ grant, onClick }) => {
  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer h-full flex flex-col"
      onClick={onClick}
    >
      <CardHeader className="bg-white border-b pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
              <div className="text-xs font-medium text-gray-500">
                {grant.organization.split(' ').map(word => word[0]).join('').slice(0, 2)}
              </div>
            </div>
            <div>
              <CardTitle className="text-base font-semibold mb-0">{grant.title}</CardTitle>
              <p className="text-sm text-gray-500">{grant.organization}</p>
            </div>
          </div>
          <div>
            {grant.newOpportunity && (
              <Badge variant="outline" className="bg-amber-50 text-amber-700 hover:bg-amber-50 border-amber-200">
                New
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 py-3">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="relative h-12 w-12 mr-2">
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
            <div>
              <p className="text-xs text-gray-500">Match</p>
              <p className="font-medium text-sm">
                {grant.matchPercentage > 90 ? 'Excellent' : 
                 grant.matchPercentage > 80 ? 'Great' : 
                 grant.matchPercentage > 70 ? 'Good' : 'Fair'}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Award</p>
            <p className="font-medium">{grant.amount}</p>
          </div>
        </div>

        {grant.insights && grant.insights.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2">AI Insights</p>
            <ul className="space-y-1.5">
              {grant.insights.map((insight, index) => (
                <li key={index} className="flex items-start text-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check text-green-600 mr-2 mt-0.5"><polyline points="20 6 9 17 4 12"/></svg>
                  {insight}
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap gap-1 mt-2">
          {grant.tags.map((tag, i) => (
            <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-fundsprout-light text-fundsprout-dark">
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-3 pb-4 border-t flex justify-between items-center">
        <div>
          <p className="text-xs text-gray-500">Deadline</p>
          <p className="font-medium text-sm">
            {new Date(grant.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            {grant.daysLeft && grant.daysLeft < 14 && (
              <span className="text-amber-600 ml-1">({grant.daysLeft} days left)</span>
            )}
          </p>
        </div>
        <Button variant="outline" size="sm" className="text-fundsprout-primary hover:text-fundsprout-dark">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Discovery;
