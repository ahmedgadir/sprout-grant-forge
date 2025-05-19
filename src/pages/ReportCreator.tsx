
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { mockGrants, mockReports } from '@/utils/mockData';
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const ReportCreator: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Find the report or grant with matching ID
  const report = mockReports.find(r => r.id === id);
  const grant = mockGrants.find(g => g.id === id);
  
  // States for the RFP analysis
  const [rfpText, setRfpText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [rfpSections, setRfpSections] = useState<string[]>([]);
  const [activeSection, setActiveSection] = useState('');
  const [sectionContents, setSectionContents] = useState<Record<string, string>>({});
  
  // AI interaction states
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isGeneratingDraft, setIsGeneratingDraft] = useState(false);
  const [aiHistory, setAiHistory] = useState<Array<{role: 'user' | 'ai', content: string}>>([]);
  
  // Mock RFP analysis function
  const analyzeRfp = () => {
    setIsAnalyzing(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      // Extract mock sections based on the RFP content
      const extractedSections = [
        'Executive Summary',
        'Project Background',
        'Goals and Objectives',
        'Methodology',
        'Budget Justification',
        'Timeline and Milestones',
        'Expected Outcomes',
        'Evaluation Plan'
      ];
      
      setRfpSections(extractedSections);
      setActiveSection(extractedSections[0]);
      
      // Initialize empty content for each section
      const initialContents: Record<string, string> = {};
      extractedSections.forEach(section => {
        initialContents[section] = '';
      });
      setSectionContents(initialContents);
      
      setIsAnalyzing(false);
      
      toast({
        title: "RFP Analysis Complete",
        description: `${extractedSections.length} sections identified in the RFP document.`,
      });
    }, 2000);
  };
  
  // Function to generate AI draft for a section
  const generateAiDraft = () => {
    setIsGeneratingDraft(true);
    
    // Simulate AI generating content
    setTimeout(() => {
      const draftContent = generateSectionDraft(activeSection);
      
      // Add the AI response to the history
      setAiHistory(prev => [...prev, {
        role: 'ai',
        content: `Here's my draft for the ${activeSection} section:\n\n${draftContent}`
      }]);
      
      setIsGeneratingDraft(false);
    }, 1500);
  };
  
  // Function to generate draft content for a section
  const generateSectionDraft = (section: string) => {
    switch(section) {
      case 'Executive Summary':
        return "This project aims to address the growing need for digital literacy in underserved communities through an innovative educational program. By leveraging existing community resources and partnerships with local technology companies, we will provide hands-on training and mentorship to 200 youth and adults over a 12-month period.";
      case 'Project Background':
        return "Digital literacy has become essential for economic opportunity and civic participation. However, our assessment has identified significant gaps in digital skills among residents of the Oak Heights neighborhood, where only 45% of households have reliable internet access and digital literacy training is limited.";
      case 'Goals and Objectives':
        return "Goal 1: Increase digital literacy skills among underserved populations\n- Objective 1.1: Provide basic computer skills training to 200 community members\n- Objective 1.2: Ensure 80% of participants can demonstrate proficiency in core digital applications\n\nGoal 2: Improve access to technology resources\n- Objective 2.1: Establish 3 community technology hubs with 15 workstations each\n- Objective 2.2: Distribute 50 refurbished computers to qualifying households";
      case 'Methodology':
        return "Our approach combines classroom instruction, peer learning, and personalized mentorship to create a comprehensive digital literacy program. The curriculum is structured into three progressive modules: Basic Digital Skills, Intermediate Applications, and Advanced Digital Creation.";
      case 'Budget Justification':
        return "The requested funding of $125,000 will be allocated as follows:\n- Personnel (45%): $56,250\n- Equipment and Technology (30%): $37,500\n- Program Materials and Curriculum (15%): $18,750\n- Evaluation and Reporting (10%): $12,500";
      case 'Timeline and Milestones':
        return "Month 1-2: Program setup and curriculum finalization\nMonth 3-4: Recruitment and outreach\nMonth 5-10: Program implementation and ongoing evaluation\nMonth 11-12: Final evaluation, reporting, and sustainability planning";
      case 'Expected Outcomes':
        return "Short-term outcomes:\n- 200 participants complete at least one digital literacy module\n- 85% of participants report increased confidence using digital tools\n\nLong-term outcomes:\n- 70% of participants apply new skills for employment, education, or civic engagement\n- Three sustainable community technology hubs established";
      case 'Evaluation Plan':
        return "Our evaluation approach combines quantitative and qualitative methods to assess program effectiveness. Pre and post assessments will measure skill acquisition, while interviews and focus groups will capture broader impacts. Key metrics include:\n\n- Number of participants completing each program module\n- Skill proficiency levels before and after training\n- Self-reported confidence and technology usage";
      default:
        return "Based on the requirements in the RFP, this section should address key aspects related to the project implementation and outcomes. Please modify this draft to include specific details about your organization's approach and capabilities.";
    }
  };
  
  // Submit user prompt to AI
  const submitPrompt = () => {
    if (!aiPrompt.trim()) return;
    
    // Add user message to history
    setAiHistory(prev => [...prev, {
      role: 'user',
      content: aiPrompt
    }]);
    
    // Clear the prompt input
    setAiPrompt('');
    
    // Simulate AI response
    setTimeout(() => {
      const response = generateAiResponse(activeSection);
      
      // Add the AI response to the history
      setAiHistory(prev => [...prev, {
        role: 'ai',
        content: response
      }]);
    }, 1500);
  };
  
  // Generate mock AI response based on user input
  const generateAiResponse = (section: string) => {
    const responses = {
      'Executive Summary': "I've updated the draft to highlight the innovative aspects of your program and its alignment with the funder's priorities. The executive summary now emphasizes both the immediate impacts and long-term sustainability of the project.",
      'Project Background': "I've enhanced the project background with more statistical evidence about the digital divide in your target community. This creates a stronger case for the urgency and importance of your proposed intervention.",
      'Goals and Objectives': "The goals and objectives section now includes more measurable outcomes and clear timelines for achievement. I've made sure each objective follows the SMART framework as requested in the RFP guidelines.",
      'Methodology': "I've expanded the methodology section to include more details about your evidence-based approaches and how they will be implemented. Each component now clearly connects to your stated objectives.",
      'Budget Justification': "The budget justification now provides more specific rationales for each expense category and demonstrates cost-effectiveness through comparisons to industry standards.",
      'Timeline and Milestones': "I've refined the timeline to include more specific milestones and deliverables at each stage of the project. This demonstrates realistic planning and accountability.",
      'Expected Outcomes': "The outcomes section now distinguishes more clearly between outputs (immediate results) and outcomes (longer-term impacts), with a stronger focus on how they address the needs identified in the RFP.",
      'Evaluation Plan': "The evaluation plan has been enhanced with more specific metrics and a clear explanation of how findings will be used for continuous improvement throughout the project period."
    };
    
    return responses[section as keyof typeof responses] || 
      "I've analyzed your request and made adjustments to strengthen this section. The content now better aligns with the funder's priorities while maintaining your organization's unique approach. Is there any specific aspect you'd like me to focus on further?";
  };
  
  // Handle section content updates
  const updateSectionContent = (content: string) => {
    setSectionContents({
      ...sectionContents,
      [activeSection]: content
    });
  };
  
  // Use AI draft in the current section
  const useAiDraft = (draftContent: string) => {
    updateSectionContent(draftContent.replace(/^Here's my draft for the .* section:\n\n/, ''));
    toast({
      title: "Draft Applied",
      description: `AI draft applied to ${activeSection} section.`,
    });
  };
  
  // Handle section navigation
  const navigateToSection = (section: string) => {
    setActiveSection(section);
  };
  
  // Function to save the draft report
  const saveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your report draft has been saved successfully.",
    });
  };
  
  // Function to submit the report
  const submitReport = () => {
    toast({
      title: "Report Submitted",
      description: "Your report has been submitted for review.",
    });
    navigate('/reports');
  };
  
  // If we couldn't find the report or grant, show error
  if (!report && !grant) {
    return (
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <div className="dashboard-container p-6">
            <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
              <p className="text-gray-600 mb-4">Report or grant not found</p>
              <Button onClick={() => navigate('/reports')} className="bg-fundsprout-primary hover:bg-fundsprout-dark">
                Return to Reports
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  const reportTitle = report ? report.title : `New Report for ${grant?.title}`;
  
  return (
    <div className="app-container">
      <Sidebar />
      
      <div className="main-content">
        <Navbar />
        
        <div className="dashboard-container p-6">
          <div className="mb-4">
            <button 
              onClick={() => navigate('/reports')} 
              className="text-gray-600 flex items-center hover:text-fundsprout-primary"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left mr-1"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
              Back to Reports
            </button>
          </div>
          
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-fundsprout-dark">{reportTitle}</h1>
            <div className="flex gap-3">
              <Button variant="outline" onClick={saveDraft}>Save Draft</Button>
              <Button className="bg-fundsprout-primary hover:bg-fundsprout-dark" onClick={submitReport}>Submit Report</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left sidebar - Sections navigation and document management */}
            <div className="lg:col-span-1 space-y-6">
              {/* RFP Analysis Section */}
              {rfpSections.length === 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>RFP Analysis</CardTitle>
                    <CardDescription>Upload or paste RFP document to extract required sections</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="rfp-doc">Upload RFP Document</Label>
                      <Input id="rfp-doc" type="file" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="rfp-text">Or paste RFP content</Label>
                      <Textarea 
                        id="rfp-text" 
                        value={rfpText}
                        onChange={(e) => setRfpText(e.target.value)}
                        className="mt-1 h-32"
                        placeholder="Paste RFP text or requirements here..."
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={analyzeRfp}
                      disabled={isAnalyzing || !rfpText.trim()}
                      className="w-full bg-fundsprout-primary hover:bg-fundsprout-dark"
                    >
                      {isAnalyzing ? 'Analyzing...' : 'Analyze RFP'}
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Report Sections</CardTitle>
                    <CardDescription>Based on RFP analysis</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="max-h-96 overflow-y-auto">
                      {rfpSections.map((section, index) => (
                        <button
                          key={index}
                          onClick={() => navigateToSection(section)}
                          className={`w-full text-left p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${activeSection === section ? 'bg-fundsprout-light text-fundsprout-dark font-medium' : ''}`}
                        >
                          <div className="flex items-center">
                            <span>{section}</span>
                            {sectionContents[section]?.trim() ? (
                              <span className="ml-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"/></svg>
                              </span>
                            ) : null}
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {/* Document Management */}
              <Card>
                <CardHeader>
                  <CardTitle>Document Management</CardTitle>
                  <CardDescription>Attach supporting documents</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-plus"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="12" x2="12" y1="18" y2="12"/><line x1="9" x2="15" y1="15" y2="15"/></svg>
                    Upload Document
                  </Button>
                  
                  {/* Mock document list */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text text-fundsprout-primary"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                        <span className="text-sm">Budget_Spreadsheet.xlsx</span>
                      </div>
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text text-fundsprout-primary"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                        <span className="text-sm">Program_Impact_Data.pdf</span>
                      </div>
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text text-fundsprout-primary"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                        <span className="text-sm">Letters_of_Support.zip</span>
                      </div>
                      <button className="text-gray-500 hover:text-gray-700">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Collaborators */}
              <Card>
                <CardHeader>
                  <CardTitle>Collaborators</CardTitle>
                  <CardDescription>Team members working on this report</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-purple-700">JD</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Jane Doe</p>
                        <p className="text-xs text-gray-500">Program Director</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">Owner</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-700">RS</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Robert Smith</p>
                        <p className="text-xs text-gray-500">Financial Analyst</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Editor</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                        <span className="text-sm font-medium text-amber-700">LP</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Lisa Park</p>
                        <p className="text-xs text-gray-500">Grant Writer</p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">Editor</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    Invite Collaborator
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content - Report editor */}
            <div className="lg:col-span-2 space-y-6">
              {rfpSections.length > 0 ? (
                <Card>
                  <CardHeader>
                    <CardTitle>{activeSection}</CardTitle>
                    <CardDescription>
                      Write your content for this section
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={sectionContents[activeSection] || ''}
                      onChange={(e) => updateSectionContent(e.target.value)}
                      className="min-h-[400px] p-4"
                      placeholder={`Enter your ${activeSection} content here...`}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-save mr-1"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                      Auto-saved at {new Date().toLocaleTimeString()}
                    </div>
                    <Button 
                      onClick={() => setAiDialogOpen(true)}
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"/></svg>
                      Open AI Assistant
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text mx-auto mb-4 text-fundsprout-primary"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                    <h2 className="text-xl font-semibold mb-2">Start with RFP Analysis</h2>
                    <p className="text-gray-600 mb-6">
                      Upload or paste your RFP document in the sidebar to extract required sections and begin creating your report.
                    </p>
                  </CardContent>
                </Card>
              )}
              
              {/* Navigation between sections */}
              {rfpSections.length > 0 && (
                <div className="flex justify-between">
                  <Button 
                    variant="outline" 
                    disabled={rfpSections.indexOf(activeSection) === 0}
                    onClick={() => {
                      const currentIndex = rfpSections.indexOf(activeSection);
                      if (currentIndex > 0) {
                        navigateToSection(rfpSections[currentIndex - 1]);
                      }
                    }}
                  >
                    Previous Section
                  </Button>
                  <Button 
                    variant="outline"
                    disabled={rfpSections.indexOf(activeSection) === rfpSections.length - 1}
                    onClick={() => {
                      const currentIndex = rfpSections.indexOf(activeSection);
                      if (currentIndex < rfpSections.length - 1) {
                        navigateToSection(rfpSections[currentIndex + 1]);
                      }
                    }}
                  >
                    Next Section
                  </Button>
                </div>
              )}
            </div>
            
            {/* Right sidebar - Report overview and progress */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Report Overview</CardTitle>
                  <CardDescription>Progress on report sections</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {rfpSections.map((section, index) => {
                    const content = sectionContents[section] || '';
                    const progress = content.length > 0 ? Math.min(100, Math.max(10, Math.floor((content.length / 100) * 25))) : 0;
                    
                    return (
                      <div key={index} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>{section}</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full">
                          <div 
                            className="h-full bg-fundsprout-primary rounded-full" 
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                  
                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between text-sm font-medium">
                      <span>Overall Completion</span>
                      <span>
                        {Math.floor(
                          Object.values(sectionContents).filter(Boolean).length / rfpSections.length * 100
                        )}%
                      </span>
                    </div>
                  </div>

                  {rfpSections.length > 0 && (
                    <div className="pt-4">
                      <Button 
                        onClick={generateAiDraft}
                        disabled={isGeneratingDraft}
                        className="w-full bg-fundsprout-primary hover:bg-fundsprout-dark flex items-center justify-center gap-2"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"/></svg>
                        {isGeneratingDraft ? 'Generating...' : 'Generate AI Draft'}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Comments and Feedback Card */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Comments & Feedback</CardTitle>
                  <CardDescription>Team collaboration for {activeSection}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4 max-h-80 overflow-y-auto">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 flex-shrink-0 flex items-center justify-center">
                        <span className="text-sm font-medium text-purple-700">JD</span>
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm">I think we should add more specifics about our outreach metrics from last quarter.</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Jane Doe • 2 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex-shrink-0 flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-700">RS</span>
                      </div>
                      <div className="flex-1">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm">Let's make sure our budget numbers align with what we submitted in the preliminary proposal.</p>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Robert Smith • 1 hour ago</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Label htmlFor="comment" className="sr-only">Add a comment</Label>
                    <div className="flex gap-2">
                      <Textarea 
                        id="comment"
                        placeholder="Add a comment..."
                        className="flex-1 h-16"
                      />
                      <Button className="bg-fundsprout-primary hover:bg-fundsprout-dark self-end">Post</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* AI Assistant Dialog */}
          <Dialog open={aiDialogOpen} onOpenChange={setAiDialogOpen}>
            <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles text-fundsprout-primary"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"/></svg>
                  AI Writing Assistant
                </DialogTitle>
                <DialogDescription>
                  Get AI assistance for your {activeSection} section
                </DialogDescription>
              </DialogHeader>
              
              <div className="flex-1 overflow-y-auto py-4 space-y-4">
                {aiHistory.length === 0 ? (
                  <div className="text-center py-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle mx-auto mb-3 text-gray-400"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/></svg>
                    <p className="text-gray-500">No conversation yet. Ask the AI for help with your {activeSection} section.</p>
                  </div>
                ) : (
                  aiHistory.map((message, index) => (
                    <div key={index} className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                      {message.role === 'ai' && (
                        <div className="w-8 h-8 rounded-full bg-fundsprout-light flex-shrink-0 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles text-fundsprout-dark"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"/></svg>
                        </div>
                      )}
                      
                      <div className={`flex-1 max-w-[80%] ${message.role === 'user' ? 'order-first' : 'order-last'}`}>
                        <div className={`p-3 rounded-lg ${message.role === 'user' ? 'bg-fundsprout-primary text-white' : 'bg-gray-100'}`}>
                          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        </div>
                        {message.role === 'ai' && message.content.includes('Here\'s my draft') && (
                          <div className="mt-2 flex justify-end">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => useAiDraft(message.content)}
                              className="flex items-center gap-1"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><polyline points="20 6 9 17 4 12"/></svg>
                              Use This Draft
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      {message.role === 'user' && (
                        <div className="w-8 h-8 rounded-full bg-fundsprout-primary flex-shrink-0 flex items-center justify-center text-white">
                          <span className="text-sm font-medium">You</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
              
              <DialogFooter className="flex-shrink-0 pt-4">
                <div className="flex gap-2 w-full">
                  <Textarea 
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder={`Ask for help with your ${activeSection} section...`}
                    className="flex-1"
                  />
                  <Button 
                    onClick={submitPrompt}
                    disabled={!aiPrompt.trim()}
                    className="bg-fundsprout-primary hover:bg-fundsprout-dark self-end"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ReportCreator;
