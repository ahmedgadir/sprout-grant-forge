
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
  const [showAiHelper, setShowAiHelper] = useState(false);
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  
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
  
  // Function to handle AI assistance
  const requestAiHelp = () => {
    setShowAiHelper(true);
    // Generate a contextual question based on the current section
    switch(activeSection) {
      case 'Executive Summary':
        setAiQuestion('What are the key points you want to highlight in your executive summary?');
        break;
      case 'Project Background':
        setAiQuestion('What is the problem or need your project addresses?');
        break;
      case 'Goals and Objectives':
        setAiQuestion('What are your primary goals and the measurable objectives for this project?');
        break;
      default:
        setAiQuestion(`What would you like assistance with for the ${activeSection} section?`);
    }
  };
  
  // Function to handle AI response generation
  const generateAiResponse = () => {
    // Simulate AI generating content
    setTimeout(() => {
      const responses: Record<string, string> = {
        'Executive Summary': "This project aims to address the growing need for digital literacy in underserved communities through an innovative educational program. By leveraging existing community resources and partnerships with local technology companies, we will provide hands-on training and mentorship to 200 youth and adults over a 12-month period.",
        'Project Background': "Digital literacy has become essential for economic opportunity and civic participation. However, our assessment has identified significant gaps in digital skills among residents of the Oak Heights neighborhood, where only 45% of households have reliable internet access and digital literacy training is limited.",
        'Goals and Objectives': "Goal 1: Increase digital literacy skills among underserved populations\n- Objective 1.1: Provide basic computer skills training to 200 community members\n- Objective 1.2: Ensure 80% of participants can demonstrate proficiency in core digital applications\n\nGoal 2: Improve access to technology resources\n- Objective 2.1: Establish 3 community technology hubs with 15 workstations each\n- Objective 2.2: Distribute 50 refurbished computers to qualifying households"
      };
      
      setAiResponse(responses[activeSection] || "Based on grant requirements for this section, you should address the specific metrics, methodologies, and outcomes related to your project implementation. Consider including quantitative targets, timeline information, and how your approach aligns with the funder's priorities.");
    }, 1500);
  };
  
  // Handle section content updates
  const updateSectionContent = (content: string) => {
    setSectionContents({
      ...sectionContents,
      [activeSection]: content
    });
  };
  
  // Handle section navigation
  const navigateToSection = (section: string) => {
    setActiveSection(section);
    setShowAiHelper(false);
    setAiResponse('');
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
              
              {/* Collaboration Tools */}
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
                      onClick={requestAiHelp}
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"/></svg>
                      Get AI Assistance
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
            
            {/* Right sidebar - AI assistance */}
            <div className="lg:col-span-1">
              {showAiHelper ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles text-fundsprout-primary"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.287 1.288L3 12l5.8 1.9a2 2 0 0 1 1.288 1.287L12 21l1.9-5.8a2 2 0 0 1 1.287-1.288L21 12l-5.8-1.9a2 2 0 0 1-1.288-1.287Z"/></svg>
                      AI Assistant
                    </CardTitle>
                    <CardDescription>
                      Get help with writing your {activeSection} section
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-700">{aiQuestion}</p>
                    </div>
                    
                    {aiResponse ? (
                      <div className="p-3 bg-fundsprout-light rounded-lg">
                        <p className="text-sm text-fundsprout-dark">{aiResponse}</p>
                        <div className="flex justify-end mt-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              updateSectionContent((sectionContents[activeSection] || '') + '\n\n' + aiResponse);
                              toast({
                                title: "Content Added",
                                description: "AI suggestion added to your section.",
                              });
                            }}
                            className="text-xs"
                          >
                            Use Suggestion
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <Button onClick={generateAiResponse} className="bg-fundsprout-primary hover:bg-fundsprout-dark">
                          Generate Suggestion
                        </Button>
                      </div>
                    )}
                    
                    {aiResponse && (
                      <div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full mt-2"
                          onClick={() => {
                            setAiResponse('');
                            generateAiResponse();
                          }}
                        >
                          Regenerate
                        </Button>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="ghost" 
                      className="w-full text-gray-500"
                      onClick={() => {
                        setShowAiHelper(false);
                        setAiResponse('');
                      }}
                    >
                      Close AI Assistant
                    </Button>
                  </CardFooter>
                </Card>
              ) : rfpSections.length > 0 ? (
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
                  </CardContent>
                </Card>
              ) : null}
              
              {rfpSections.length > 0 && (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCreator;
