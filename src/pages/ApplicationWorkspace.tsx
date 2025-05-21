
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import { mockGrants } from '@/utils/mockData';
import { mockApplicationSections, mockApplicationQuestions } from '@/utils/mockApplicationData';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import WorkspaceHeader from '@/components/workspace/WorkspaceHeader';
import WorkspaceSidebar from '@/components/workspace/WorkspaceSidebar';
import WorkspaceEditor from '@/components/workspace/WorkspaceEditor';
import WorkspaceAIAssistant from '@/components/workspace/WorkspaceAIAssistant';
import { ApplicationSection } from '@/types/application';
import { FileText, MessageCircle, Lightbulb } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';

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
  const [uploadRfpDialogOpen, setUploadRfpDialogOpen] = useState<boolean>(false);
  const [isAnalyzingRfp, setIsAnalyzingRfp] = useState<boolean>(false);
  const [rfpAnalysisProgress, setRfpAnalysisProgress] = useState<number>(0);
  
  // Initialize with the first section active
  useEffect(() => {
    if (sections.length > 0 && !activeSectionId) {
      setActiveSectionId(sections[0].id);
    }
  }, [sections, activeSectionId]);

  // For RFP upload demo
  useEffect(() => {
    if (isAnalyzingRfp) {
      const interval = setInterval(() => {
        setRfpAnalysisProgress(prev => {
          const newProgress = prev + 15;
          if (newProgress >= 100) {
            setIsAnalyzingRfp(false);
            clearInterval(interval);
            
            // Show success toast
            toast({
              title: "RFP Analysis Complete",
              description: "We've extracted 14 requirements and aligned your application with the funder priorities.",
            });
            
            setUploadRfpDialogOpen(false);
            return 0;
          }
          return newProgress;
        });
      }, 800);
      
      return () => clearInterval(interval);
    }
  }, [isAnalyzingRfp]);
  
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

  // Handle RFP upload
  const handleRfpUpload = () => {
    setIsAnalyzingRfp(true);
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
                    const currentContent = activeSection.content || '';
                    const updatedContent = currentContent 
                      ? currentContent + '\n\n' + text 
                      : text;
                    
                    handleContentChange(activeSection.id, updatedContent);
                    
                    toast({
                      title: "Content inserted",
                      description: "AI-generated content has been added to your document.",
                    });
                  }
                }}
              />
            )}
          </div>
        </div>
        
        {/* Bottom Action Bar */}
        <div className="p-3 border-t flex justify-between items-center">
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
              className="flex items-center space-x-2"
            >
              <Lightbulb className="h-4 w-4" />
              <span>{aiAssistantOpen ? "Hide AI Assistant" : "AI Assistant"}</span>
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => setUploadRfpDialogOpen(true)}
              className="flex items-center space-x-2"
            >
              <FileText className="h-4 w-4" />
              <span>Upload RFP</span>
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
      
      {/* RFP Upload Dialog */}
      <Dialog open={uploadRfpDialogOpen} onOpenChange={setUploadRfpDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upload RFP Document</DialogTitle>
            <DialogDescription>
              Upload the Request for Proposals (RFP) document to automatically analyze requirements and improve your application.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <Input 
              type="file" 
              id="rfp-document" 
              accept=".pdf,.doc,.docx,.txt"
              disabled={isAnalyzingRfp}
            />
            
            {isAnalyzingRfp && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Analyzing RFP document...</span>
                  <span>{rfpAnalysisProgress}%</span>
                </div>
                <Progress value={rfpAnalysisProgress} className="h-2" />
                <p className="text-xs text-gray-500 italic">
                  Extracting requirements, identifying priorities, and aligning your application...
                </p>
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadRfpDialogOpen(false)} disabled={isAnalyzingRfp}>
              Cancel
            </Button>
            <Button 
              onClick={handleRfpUpload} 
              className="bg-fundsprout-primary hover:bg-fundsprout-dark"
              disabled={isAnalyzingRfp}
            >
              {isAnalyzingRfp ? "Analyzing..." : "Analyze RFP"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationWorkspace;
