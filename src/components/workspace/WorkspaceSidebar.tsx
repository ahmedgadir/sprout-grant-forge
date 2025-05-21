
import React from 'react';
import { ApplicationSection } from '@/types/application';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface WorkspaceSidebarProps {
  sections: ApplicationSection[];
  activeSectionId: string | null;
  onSectionSelect: (sectionId: string) => void;
  onToggleComplete: (sectionId: string) => void;
}

const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({
  sections,
  activeSectionId,
  onSectionSelect,
  onToggleComplete
}) => {
  // Calculate completion percentage
  const completedSections = sections.filter(section => section.completed).length;
  const completionPercentage = Math.round((completedSections / sections.length) * 100);
  
  return (
    <div className="w-64 border-r flex flex-col h-full overflow-hidden bg-gray-50">
      <div className="p-4 border-b">
        <div className="text-sm font-medium mb-1">Application Progress</div>
        <div className="flex items-center">
          <div className="flex-1 bg-gray-200 h-2 rounded-full mr-2">
            <div 
              className="bg-fundsprout-primary h-2 rounded-full" 
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <div className="text-xs font-medium">{completionPercentage}%</div>
        </div>
      </div>
      
      <div className="overflow-y-auto flex-1">
        <div className="py-2">
          {sections.map((section) => (
            <div 
              key={section.id}
              className={cn(
                "px-4 py-3 border-l-2 cursor-pointer",
                activeSectionId === section.id
                  ? "border-fundsprout-primary bg-fundsprout-light/30"
                  : "border-transparent hover:bg-gray-100"
              )}
              onClick={() => onSectionSelect(section.id)}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="font-medium text-sm">
                  {section.title}
                  {section.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleComplete(section.id);
                  }}
                  className={cn(
                    "w-4 h-4 rounded border flex items-center justify-center",
                    section.completed 
                      ? "bg-fundsprout-primary border-fundsprout-primary text-white" 
                      : "border-gray-400"
                  )}
                >
                  {section.completed && (
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>
                  )}
                </button>
              </div>
              
              <div className="text-xs text-gray-500">{section.description}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Instructions */}
      <div className="p-4 border-t bg-fundsprout-light/10">
        <h4 className="text-xs font-semibold mb-2">Instructions</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• Complete all required sections marked with *</li>
          <li>• Save your progress regularly</li>
          <li>• Use the AI Assistant for help</li>
          <li>• Check for errors before submitting</li>
        </ul>
      </div>
    </div>
  );
};

export default WorkspaceSidebar;
