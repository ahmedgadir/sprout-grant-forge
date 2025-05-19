
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { mockGrants, Grant } from '../utils/mockData';
import { useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FindGrants: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAmount, setSelectedAmount] = useState('all');
  const navigate = useNavigate();

  const filteredGrants = mockGrants.filter(grant => {
    const matchesSearch = 
      searchTerm === '' || 
      grant.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grant.organization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      grant.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = 
      selectedCategory === 'all' || 
      grant.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase());
    
    const grantAmount = parseInt(grant.amount.replace(/[^0-9]/g, ''));
    const matchesAmount = selectedAmount === 'all' ||
      (selectedAmount === 'under50k' && grantAmount < 50000) ||
      (selectedAmount === '50kto100k' && grantAmount >= 50000 && grantAmount <= 100000) ||
      (selectedAmount === '100kto200k' && grantAmount > 100000 && grantAmount <= 200000) ||
      (selectedAmount === 'over200k' && grantAmount > 200000);

    return matchesSearch && matchesCategory && matchesAmount;
  });

  const uniqueTags = Array.from(new Set(mockGrants.flatMap(grant => grant.tags)));

  return (
    <div className="app-container">
      <Sidebar />
      
      <div className="main-content">
        <Navbar />
        
        <div className="dashboard-container p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-fundsprout-dark">Find Grants</h1>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
              <Input
                placeholder="Search for grants by keyword, organization, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-lg"
              />
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {uniqueTags.map(tag => (
                      <SelectItem key={tag} value={tag.toLowerCase()}>{tag}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedAmount} onValueChange={setSelectedAmount}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Amount" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Amounts</SelectItem>
                    <SelectItem value="under50k">Under $50,000</SelectItem>
                    <SelectItem value="50kto100k">$50,000 - $100,000</SelectItem>
                    <SelectItem value="100kto200k">$100,000 - $200,000</SelectItem>
                    <SelectItem value="over200k">Over $200,000</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Tabs defaultValue="all" className="mb-6">
              <TabsList>
                <TabsTrigger value="all">All Grants</TabsTrigger>
                <TabsTrigger value="recommended">Recommended</TabsTrigger>
                <TabsTrigger value="due-soon">Due Soon</TabsTrigger>
              </TabsList>
            </Tabs>

            {filteredGrants.length === 0 ? (
              <div className="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search-x mx-auto mb-4 text-gray-400"><path d="m13.5 8.5-5 5"/><path d="m8.5 8.5 5 5"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                <h2 className="text-xl font-semibold mb-2">No Matching Grants</h2>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search or filters to find more opportunities.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGrants.map((grant) => (
                  <GrantCard key={grant.id} grant={grant} onClick={() => navigate(`/grants/${grant.id}`)} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface GrantCardProps {
  grant: Grant;
  onClick: () => void;
}

const GrantCard: React.FC<GrantCardProps> = ({ grant, onClick }) => {
  return (
    <div className="grant-card animate-fade-in hover:shadow-md transition-shadow duration-300 cursor-pointer" 
         onClick={onClick}>
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          <div className="text-xs font-medium text-gray-500">{grant.organization.split(' ').map(word => word[0]).join('').slice(0, 2)}</div>
        </div>
        <div className="flex items-center">
          <div className="relative h-8 w-8">
            <svg className="h-8 w-8" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="16" stroke="#E5E7EB" strokeWidth="3" fill="none"></circle>
              <circle
                cx="18"
                cy="18"
                r="16"
                stroke="#2C6E49"
                strokeWidth="3"
                fill="none"
                strokeDasharray={`${(grant.matchPercentage || 0) / 100 * 100} 100`}
                strokeDashoffset="25"
                strokeLinecap="round"
              ></circle>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
              {grant.matchPercentage || 0}%
            </span>
          </div>
        </div>
      </div>

      <h3 className="font-medium text-gray-900 mb-1">{grant.title}</h3>
      <p className="text-sm text-gray-500 mb-3">{grant.organization}</p>
      
      <div className="text-sm text-gray-600 mb-4 line-clamp-2" style={{minHeight: '40px'}}>
        {grant.description}
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex space-x-1">
          {grant.tags.slice(0, 2).map((tag, i) => (
            <span key={i} className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-fundsprout-light text-fundsprout-dark">
              {tag}
            </span>
          ))}
          {grant.tags.length > 2 && (
            <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
              +{grant.tags.length - 2}
            </span>
          )}
        </div>
        <div className="text-sm text-gray-500">
          <span className="font-medium">{grant.amount}</span>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
        <div className="text-xs text-gray-500">
          Deadline: <span className="font-medium">{new Date(grant.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <Button 
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }} 
          variant="link"
          className="text-fundsprout-primary hover:text-fundsprout-dark font-medium text-sm p-0"
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default FindGrants;
