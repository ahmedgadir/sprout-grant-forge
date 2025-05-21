
import React from 'react';
import { Button } from '@/components/ui/button';
import { Grant } from '@/utils/mockData';

interface WorkspaceHeaderProps {
  grant: Grant;
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  onSave: () => void;
  onSubmit: () => void;
  saving: boolean;
}

const WorkspaceHeader: React.FC<WorkspaceHeaderProps> = ({
  grant,
  expanded,
  setExpanded,
  onSave,
  onSubmit,
  saving
}) => {
  return (
    <div className="border-b bg-white p-4 flex items-center justify-between">
      <div className="flex items-center">
        <Button 
          variant="ghost"
          size="sm"
          onClick={() => setExpanded(!expanded)}
          className="mr-3 md:hidden"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </Button>
        
        <div>
          <h1 className="font-medium text-lg text-fundsprout-dark flex items-center">
            <span>{grant.title}</span>
            <span className="mx-2 text-gray-400">·</span>
            <span className="text-base text-gray-500">Application</span>
          </h1>
          <div className="text-xs text-gray-500 flex items-center">
            <span>{grant.organization}</span>
            <span className="mx-1">·</span>
            <span>Due: {new Date(grant.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>
      </div>
      
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={onSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save'}
        </Button>
        
        <Button 
          size="sm"
          onClick={onSubmit}
          className="bg-fundsprout-primary hover:bg-fundsprout-dark"
          disabled={saving}
        >
          Submit Application
        </Button>
      </div>
    </div>
  );
};

export default WorkspaceHeader;
