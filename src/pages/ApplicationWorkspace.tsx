
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
import { FileText, MessageCircle, Lightbulb, Check } from 'lucide-react';
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
  const [uploadRfpDialogOpen, setUploadRfpDialogOpen] = useState<boolean>(true); // Open by default
  const [isAnalyzingRfp, setIsAnalyzingRfp] = useState<boolean>(false);
  const [rfpAnalysisProgress, setRfpAnalysisProgress] = useState<number>(0);
  const [rfpAnalysisComplete, setRfpAnalysisComplete] = useState<boolean>(false);
  const [rfpQuestions, setRfpQuestions] = useState<string[]>([]);
  const [isGeneratingDraft, setIsGeneratingDraft] = useState<boolean>(false);
  const [draftGenerationProgress, setDraftGenerationProgress] = useState<number>(0);
  
  // Initialize with the first section active
  useEffect(() => {
    if (sections.length > 0 && !activeSectionId) {
      setActiveSectionId(sections[0].id);
    }
  }, [sections, activeSectionId]);

  // Auto-open RFP dialog when first loading the workspace
  useEffect(() => {
    // If we have a grant ID and haven't completed analysis, show the dialog
    if (grantId && !rfpAnalysisComplete) {
      setUploadRfpDialogOpen(true);
    }
  }, [grantId, rfpAnalysisComplete]);

  // For RFP upload demo
  useEffect(() => {
    if (isAnalyzingRfp) {
      const interval = setInterval(() => {
        setRfpAnalysisProgress(prev => {
          const newProgress = prev + 15;
          if (newProgress >= 100) {
            setIsAnalyzingRfp(false);
            clearInterval(interval);
            
            // Generate mock RFP questions based on the grant
            const mockRfpQuestions = [
              "How does your project address community engagement as mentioned in Section 3.2?",
              "What specific measurable outcomes will your project achieve in the first year?",
              "Describe your organization's experience with similar initiatives in the target community.",
              "How will you ensure sustainability of the project beyond the funding period?",
              "What partnerships or collaborations are planned to enhance project impact?"
            ];
            
            setRfpQuestions(mockRfpQuestions);
            setRfpAnalysisComplete(true);
            
            // Show success toast
            toast({
              title: "RFP Analysis Complete",
              description: "We've extracted 14 requirements and aligned your application with the funder priorities.",
            });
            
            // Don't close the dialog, let user see the questions first
            return 0;
          }
          return newProgress;
        });
      }, 800);
      
      return () => clearInterval(interval);
    }
  }, [isAnalyzingRfp]);
  
  // For AI draft generation
  useEffect(() => {
    if (isGeneratingDraft) {
      const interval = setInterval(() => {
        setDraftGenerationProgress(prev => {
          const newProgress = prev + 10;
          if (newProgress >= 100) {
            setIsGeneratingDraft(false);
            clearInterval(interval);
            
            // Generate content for each section
            generateAIDraft();
            
            // Show success toast
            toast({
              title: "AI Draft Generated",
              description: "Your application sections have been populated with AI-generated content based on the RFP analysis.",
            });
            
            return 0;
          }
          return newProgress;
        });
      }, 600);
      
      return () => clearInterval(interval);
    }
  }, [isGeneratingDraft]);
  
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
  
  // Generate AI draft content for all sections
  const generateAIDraft = () => {
    const sectionContent = {
      'org-info': "Our organization, Community Health Alliance, has been serving the Bay Area for over 15 years, focusing on improving healthcare access for underserved populations. We have successfully implemented five similar community health initiatives, reaching over 50,000 individuals across diverse demographics. Our team includes healthcare professionals, community organizers, and data analysts with extensive experience in public health interventions. Our previous projects have resulted in measurable improvements in health outcomes, including a 25% increase in preventive care utilization and a 30% reduction in emergency room visits for manageable conditions.",
      
      'project-summary': "The Community Wellness Initiative aims to address health disparities in underserved neighborhoods through a comprehensive approach combining education, preventive care services, and community capacity building. This project directly responds to the priorities outlined in Section 2.1 of the RFP by implementing innovative strategies for sustainable community health improvement. We will establish four community wellness hubs, train 120 community health advocates, and provide direct services to 10,000 residents annually. Our approach is unique in its integration of digital health solutions with traditional community-based methods, creating a scalable model that can be replicated in similar communities.",
      
      'need-statement': "Recent data from the County Health Department shows that residents in our target neighborhoods face significant health disparities, with 35% higher rates of chronic disease and 42% less access to preventive care compared to citywide averages. These disparities disproportionately affect communities of color and low-income residents, with 48% reporting delays in seeking care due to cost concerns (Community Health Survey, 2024). The COVID-19 pandemic further exacerbated these inequities, with vaccination rates 18% lower in these neighborhoods. Despite these challenges, existing healthcare services reach only 30% of the eligible population, leaving a significant gap that this project aims to address through innovative community-based approaches that overcome traditional barriers of trust, access, and health literacy.",
      
      'goals-objectives': "Goal 1: Improve access to preventive healthcare services in target communities.\n- Objective 1.1: Establish 4 community wellness hubs by Q3 2025, serving at least 2,500 residents each annually.\n- Objective 1.2: Increase preventive care utilization by 40% among program participants within 18 months.\n- Objective 1.3: Achieve 85% satisfaction rate among service recipients as measured by quarterly surveys.\n\nGoal 2: Build community capacity for sustained health improvement.\n- Objective 2.1: Train 120 community health advocates by end of year 1, with 85% retention rate.\n- Objective 2.2: Develop partnerships with at least 15 local organizations by month 6.\n- Objective 2.3: Create sustainable funding model with at least 30% of budget covered by diverse sources by project end.",
      
      'methodology': "Our implementation strategy follows a phased approach:\n\nPhase 1 (Months 1-3): Community Engagement & Planning\n- Conduct community listening sessions in all target neighborhoods\n- Recruit and form community advisory board\n- Finalize site selections for wellness hubs\n\nPhase 2 (Months 4-9): Infrastructure & Capacity Building\n- Establish physical wellness hubs with necessary equipment and staffing\n- Develop training curriculum and begin community health advocate training\n- Create referral networks with existing healthcare providers\n\nPhase 3 (Months 10-24): Full Implementation & Evaluation\n- Launch comprehensive service delivery across all hubs\n- Implement digital health platform for appointment scheduling and health tracking\n- Conduct ongoing data collection and quarterly program adjustments\n\nThis methodology directly addresses the community engagement requirement specified in Section 3.2 of the RFP through our participatory approach that involves community members at every stage.",
      
      'evaluation': "Our evaluation plan incorporates both process and outcome metrics:\n\nProcess Metrics:\n- Number of individuals served (target: 10,000 annually)\n- Number of community health advocates trained (target: 120)\n- Service delivery hours completed (target: 8,000 hours annually)\n- Partner organization engagement (target: 15+ active partnerships)\n\nOutcome Metrics:\n- Increase in preventive care utilization (target: 40% improvement)\n- Reduction in preventable emergency room visits (target: 25% reduction)\n- Improvement in self-reported health status (target: 30% improvement on standardized scale)\n- Community health knowledge gains (target: 50% improvement on pre/post assessments)\n\nData Collection Methods:\n- Participant registration and service tracking database\n- Pre/post knowledge and behavior assessments\n- Quarterly participant satisfaction surveys\n- Healthcare utilization data through partner healthcare providers\n- Bi-annual community health status survey\n\nAll evaluation activities will be overseen by our Research and Evaluation Team with quarterly reports shared with stakeholders.",
      
      'budget': "Total Project Budget: $1,250,000\n\nPersonnel: $650,000\n- Project Director (1.0 FTE): $90,000\n- Program Managers (2.0 FTE): $140,000\n- Community Health Coordinators (4.0 FTE): $280,000\n- Data Analyst (1.0 FTE): $70,000\n- Administrative Assistant (1.0 FTE): $50,000\n- Fringe Benefits (15%): $94,500\n\nOperations: $350,000\n- Hub Facilities (4 locations): $180,000\n- Equipment & Supplies: $85,000\n- Technology & Communications: $65,000\n- Transportation: $20,000\n\nProgram Activities: $175,000\n- Training Programs: $60,000\n- Community Events: $45,000\n- Educational Materials: $35,000\n- Participant Incentives: $35,000\n\nEvaluation: $75,000\n- External Evaluator: $45,000\n- Data Collection Tools: $20,000\n- Reporting & Dissemination: $10,000\n\nCost-effectiveness is achieved through leveraging existing community spaces for hubs (saving approximately $120,000 in construction costs) and our train-the-trainer model that expands reach without proportional staff increases."
    };
    
    setSections(prevSections =>
      prevSections.map(section => {
        const content = sectionContent[section.id as keyof typeof sectionContent] || section.content;
        
        // Mark sections as completed if they have content
        const completed = content ? true : section.completed;
        
        return {
          ...section,
          content,
          completed
        };
      })
    );
  };
  
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

  // Handle AI draft generation
  const handleGenerateAIDraft = () => {
    setIsGeneratingDraft(true);
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
            {!rfpAnalysisComplete ? (
              <>
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
              </>
            ) : (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-100 rounded-md p-3">
                  <h3 className="text-green-700 font-medium flex items-center gap-1 mb-2">
                    <Check className="h-4 w-4" /> Analysis Complete
                  </h3>
                  <p className="text-sm text-green-700 mb-2">
                    We've analyzed your RFP and identified key requirements that your application should address.
                  </p>
                  <div className="text-sm font-medium text-green-800 mb-1">Key Questions to Address:</div>
                  <ul className="space-y-2 text-sm">
                    {rfpQuestions.map((question, index) => (
                      <li key={index} className="flex gap-2 text-green-700">
                        <span className="font-medium">{index + 1}.</span>
                        <span>{question}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {isGeneratingDraft ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Generating AI draft...</span>
                      <span>{draftGenerationProgress}%</span>
                    </div>
                    <Progress value={draftGenerationProgress} className="h-2" />
                    <p className="text-xs text-gray-500 italic">
                      Creating content for each section based on RFP requirements and best practices...
                    </p>
                  </div>
                ) : (
                  <Button 
                    onClick={handleGenerateAIDraft}
                    className="w-full bg-fundsprout-primary hover:bg-fundsprout-dark flex items-center justify-center gap-2"
                  >
                    <Lightbulb className="h-4 w-4" />
                    Generate First AI-Powered Draft
                  </Button>
                )}
              </div>
            )}
          </div>
          
          <DialogFooter>
            {!rfpAnalysisComplete ? (
              <>
                <Button variant="outline" onClick={() => setUploadRfpDialogOpen(false)} disabled={isAnalyzingRfp}>
                  Skip
                </Button>
                <Button 
                  onClick={handleRfpUpload} 
                  className="bg-fundsprout-primary hover:bg-fundsprout-dark"
                  disabled={isAnalyzingRfp}
                >
                  {isAnalyzingRfp ? "Analyzing..." : "Analyze RFP"}
                </Button>
              </>
            ) : (
              <Button 
                onClick={() => setUploadRfpDialogOpen(false)}
                variant={isGeneratingDraft ? "outline" : "default"}
                disabled={isGeneratingDraft}
              >
                {isGeneratingDraft ? "Generating..." : "Continue to Application"}
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ApplicationWorkspace;
