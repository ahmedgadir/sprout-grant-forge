
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockGrants } from '../utils/mockData';
import type { Grant } from '../utils/mockData';

interface MatchedGrantsProps {
  className?: string;
}

const MatchedGrants: React.FC<MatchedGrantsProps> = ({ className }) => {
  const [filterType, setFilterType] = useState<'all' | 'recommended'>('recommended');
  const navigate = useNavigate();
  
  const filteredGrants = filterType === 'all' 
    ? mockGrants
    : mockGrants.filter(grant => grant.status === 'recommended');
    
  return (
    <div className={`bg-white rounded-lg border border-gray-200 card-shadow ${className}`}>
      <div className="p-5 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Matched Grants</h2>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setFilterType('recommended')}
              className={`text-sm px-3 py-1 rounded-md ${filterType === 'recommended' ? 'bg-fundsprout-light text-fundsprout-dark' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              Recommended
            </button>
            <button 
              onClick={() => setFilterType('all')}
              className={`text-sm px-3 py-1 rounded-md ${filterType === 'all' ? 'bg-fundsprout-light text-fundsprout-dark' : 'text-gray-500 hover:bg-gray-100'}`}
            >
              All Matches
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-4 max-h-[600px] overflow-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGrants.map((grant) => (
            <GrantCard key={grant.id} grant={grant} />
          ))}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 text-center">
        <Link to="/discovery" className="text-fundsprout-primary hover:text-fundsprout-dark font-medium flex items-center justify-center space-x-2 mx-auto">
          <span>View all grant opportunities</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </Link>
      </div>
    </div>
  );
};

interface GrantCardProps {
  grant: Grant;
}

const GrantCard: React.FC<GrantCardProps> = ({ grant }) => {
  const navigate = useNavigate();
  
  return (
    <div className="grant-card animate-fade-in hover:shadow-md transition-shadow duration-300 cursor-pointer" 
         onClick={() => navigate(`/grants/${grant.id}`)}>
      <div className="flex items-center justify-between mb-3">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
          {/* Logo placeholder */}
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
                strokeDasharray={`${(grant.matchPercentage / 100) * 100} 100`}
                strokeDashoffset="25"
                strokeLinecap="round"
              ></circle>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
              {grant.matchPercentage}%
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
        <div className="flex space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event from firing
              navigate(`/grants/${grant.id}`);
            }} 
            className="text-fundsprout-primary hover:text-fundsprout-dark font-medium text-sm"
          >
            View Details
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click event from firing
              navigate(`/applications/create/${grant.id}`);
            }} 
            className="text-fundsprout-primary hover:bg-fundsprout-light/50 font-medium text-sm px-2 py-1 rounded"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default MatchedGrants;
