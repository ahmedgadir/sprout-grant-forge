
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { mockGrants } from '@/utils/mockData';
import { mockApplicationSections, mockApplicationQuestions } from '@/utils/mockApplicationData';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import WorkspaceHeader from '@/components/workspace/WorkspaceHeader';
import WorkspaceSidebar from '@/components/workspace/WorkspaceSidebar';
import WorkspaceEditor from '@/components/workspace/WorkspaceEditor';
import WorkspaceAIAssistant from '@/components/workspace/WorkspaceAIAssistant';
import { ApplicationSection } from '@/types/application';

const ApplicationWorkspace: React.FC = () => {
  const { grantId } = useParams<{ grantId: string }>();
  const navigate = useNavigate();
  
  // Find the grant with the matching ID
  const grant = mockGrants.find(g => g.id === grantId);
  
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [sections, setSections] = useState<ApplicationSection[]>(mockApplicationSections);
  const [saving, setSaving] = useState<boolean>(false);
  const [expanded, setExpanded] = useState<boolean>(true);
  const [aiAssistantOpen, setAiAssistantOpen] = useState<boolean>(false);
  
  // Initialize with the first section active
  useEffect(() => {
    if (sections.length > 0 && !activeSectionId) {
      setActiveSectionId(sections[0].id);
    }
  }, [sections, activeSectionId]);
  
  if (!grant) {
    return (
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <div className="p-6">
            <p className="text-gray-600 mb-4">Grant not found</p>
            <Button onClick={() => navigate('/discovery')} className="bg-fundsprout-primary hover:bg-fundsprout-dark">
              Return to Discovery
            </Button>
          </div>
        </div>
      </div>
    );
  }
  
  // Get the active section
  const activeSection = sections.find(section => section.id === activeSectionId);
  
  // Handle section content change
  const handleContentChange = (sectionId: string, content: string) => {
    setSections(prevSections => 
      prevSections.map(section => 
        section.id === sectionId 
          ? { ...section, content } 
          : section
      )
    );
  };
  
  // Handle section completion toggle
  const handleToggleComplete = (sectionId: string) => {
    setSections(prevSections => 
      prevSections.map(section => 
        section.id === sectionId 
          ? { ...section, completed: !section.completed } 
          : section
      )
    );
  };

  // Save progress
  const handleSaveProgress = () => {
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Progress saved",
        description: "Your application progress has been saved successfully.",
      });
    }, 800);
  };
  
  // Submit application
  const handleSubmitApplication = () => {
    // Check if all required sections are completed
    const allRequiredCompleted = sections
      .filter(section => section.required)
      .every(section => section.completed);
    
    if (!allRequiredCompleted) {
      toast({
        title: "Cannot submit application",
        description: "Please complete all required sections before submitting.",
        variant: "destructive"
      });
      return;
    }
    
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Application submitted",
        description: "Your application has been submitted successfully.",
      });
      navigate('/discovery');
    }, 1500);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-white">
      {/* Main Sidebar */}
      <div className={expanded ? "block" : "hidden md:block"}>
        <Sidebar className="h-full" />
      </div>
      
      {/* Workspace Container */}
      <div className="flex flex-col flex-1 h-full overflow-hidden">
        {/* Workspace Header */}
        <WorkspaceHeader 
          grant={grant} 
          expanded={expanded} 
          setExpanded={setExpanded}
          onSave={handleSaveProgress}
          onSubmit={handleSubmitApplication}
          saving={saving}
        />
        
        {/* Workspace Content */}
        <div className="flex flex-1 overflow-hidden">
          {/* Document Sidebar */}
          <WorkspaceSidebar 
            sections={sections}
            activeSectionId={activeSectionId}
            onSectionSelect={setActiveSectionId}
            onToggleComplete={handleToggleComplete}
          />
          
          {/* Main Editor Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Editor */}
            <WorkspaceEditor 
              section={activeSection} 
              onChange={(content) => activeSection && handleContentChange(activeSection.id, content)}
            />
            
            {/* AI Assistant Panel */}
            {aiAssistantOpen && (
              <WorkspaceAIAssistant
                section={activeSection}
                grant={grant}
                onClose={() => setAiAssistantOpen(false)}
                onInsertText={(text) => {
                  if (activeSection) {
                    handleContentChange(
                      activeSection.id, 
                      (activeSection.content || '') + '\n\n' + text
                    );
                  }
                }}
              />
            )}
          </div>
        </div>
        
        {/* Bottom Action Bar */}
        <div className="p-3 border-t flex justify-between items-center">
          <div>
            <Button 
              variant="ghost" 
              onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
              className="flex items-center space-x-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <span>AI Assistant</span>
            </Button>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={handleSaveProgress}
              disabled={saving}
            >
              Save Progress
            </Button>
            
            <Button 
              onClick={handleSubmitApplication}
              className="bg-fundsprout-primary hover:bg-fundsprout-dark"
              disabled={saving}
            >
              Submit Application
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationWorkspace;
