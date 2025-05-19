
import React from 'react';
import { Link } from 'react-router-dom';
import { mockActivities } from '../utils/mockData';

const getActivityIcon = (type: string) => {
  switch(type) {
    case 'application':
      return (
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-plus"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="12" x2="12" y1="18" y2="12"/><line x1="9" x2="15" y1="15" y2="15"/></svg>
        </div>
      );
    case 'comment':
      return (
        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </div>
      );
    case 'deadline':
      return (
        <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-calendar"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
        </div>
      );
    case 'submission':
      return (
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
        </div>
      );
    case 'award':
      return (
        <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trophy"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
        </div>
      );
    default:
      return (
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-bell"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
        </div>
      );
  }
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHrs = diffMs / (1000 * 60 * 60);
  
  if (diffHrs < 24) {
    if (diffHrs < 1) {
      const diffMins = Math.round(diffMs / (1000 * 60));
      return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
    }
    return `${Math.round(diffHrs)} hour${Math.round(diffHrs) !== 1 ? 's' : ''} ago`;
  } else if (diffHrs < 48) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

interface RecentActivityProps {
  className?: string;
}

const RecentActivity: React.FC<RecentActivityProps> = ({ className }) => {
  return (
    <div className={`bg-white rounded-lg border border-gray-200 card-shadow ${className}`}>
      <div className="p-5 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
      </div>
      <div className="p-4 max-h-[400px] overflow-auto">
        {mockActivities.map((activity) => (
          <div key={activity.id} className="flex items-start mb-5 last:mb-0 cursor-pointer hover:bg-gray-50 p-2 rounded-md transition-colors" 
               onClick={() => {
                 // Handle activity click based on type
                 if (activity.type === 'application' && activity.relatedId) {
                   window.location.href = `/applications/${activity.relatedId}`;
                 } else if (activity.type === 'deadline' && activity.relatedId) {
                   window.location.href = `/grants/${activity.relatedId}`;
                 }
               }}>
            {getActivityIcon(activity.type)}
            <div className="ml-3 flex-1">
              <p className="font-medium text-gray-900">{activity.title}</p>
              <p className="text-sm text-gray-600">{activity.description}</p>
              <div className="flex items-center mt-1 text-xs text-gray-500">
                {activity.user && (
                  <span className="flex items-center">
                    <span className="mr-1">{activity.user.name}</span>
                    <span className="mx-1">•</span>
                  </span>
                )}
                <span>{formatDate(activity.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 border-t border-gray-200 text-center">
        <Link to="/activity" className="text-fundsprout-primary hover:text-fundsprout-dark font-medium">
          View all activity
        </Link>
      </div>
    </div>
  );
};

export default RecentActivity;
