
import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { mockApplications, mockGrants, Application } from '../utils/mockData';
import { useNavigate, useParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const Applications: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('all');
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  
  // States for application creation
  const [isCreatingApplication, setIsCreatingApplication] = useState(false);
  const [isAnalyzingRfp, setIsAnalyzingRfp] = useState(false);
  const [analyzingProgress, setAnalyzingProgress] = useState(0);
  const [identifiedSections, setIdentifiedSections] = useState<string[]>([]);
  const [sectionContents, setSectionContents] = useState<Record<string, string>>({});
  const [activeSection, setActiveSection] = useState('');
  const [showAiHelper, setShowAiHelper] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [extraSectionName, setExtraSectionName] = useState('');
  
  // If there's a grant ID in the URL, we're creating a new application
  useEffect(() => {
    if (id) {
      const grant = mockGrants.find(g => g.id === id);
      if (grant) {
        setIsCreatingApplication(true);
        startRfpAnalysis(grant);
      }
    }
  }, [id]);
  
  const filteredApplications = selectedTab === 'all' 
    ? mockApplications 
    : mockApplications.filter(app => app.status === selectedTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'draft': return 'bg-amber-100 text-amber-800';
      case 'submitted': return 'bg-blue-100 text-blue-800';
      case 'awarded': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to simulate RFP analysis
  const startRfpAnalysis = (grant: any) => {
    setIsAnalyzingRfp(true);
    setAnalyzingProgress(0);
    
    // Simulating a loading progress
    const interval = setInterval(() => {
      setAnalyzingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          completeRfpAnalysis(grant);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };
  
  const completeRfpAnalysis = (grant: any) => {
    // Based on the grant type, determine recommended sections
    const sections = [
      'Executive Summary',
      'Organizational Background',
      'Statement of Need',
      'Project Description',
      'Goals and Objectives',
      'Implementation Timeline',
      'Evaluation Plan',
      'Budget Narrative',
      'Sustainability Plan',
    ];
    
    setIdentifiedSections(sections);
    setActiveSection(sections[0]);
    
    // Generate initial content for each section
    const initialContents: Record<string, string> = {};
    sections.forEach(section => {
      initialContents[section] = generateSectionContent(section, grant);
    });
    setSectionContents(initialContents);
    
    setIsAnalyzingRfp(false);
    
    toast({
      title: "Application Sections Ready",
      description: `${sections.length} sections have been identified based on the grant requirements.`,
    });
  };
  
  const generateSectionContent = (section: string, grant: any) => {
    // Generate placeholder content based on section type
    const baseContent = `This is a suggested structure for your ${section}.\n\n`;
    
    switch(section) {
      case 'Executive Summary':
        return `${baseContent}Provide a concise overview of your organization and the proposed project. Highlight the total funding requested, the main issue your project addresses, and expected outcomes.

Suggested structure:
1. Brief introduction to your organization
2. Problem statement
3. Proposed solution and approach
4. Amount requested and project duration
5. Expected impact and outcomes`;
      
      case 'Organizational Background':
        return `${baseContent}Describe your organization's mission, history, accomplishments, and qualifications for implementing this project.

Suggested structure:
1. Mission and vision statement
2. Brief history and founding
3. Recent accomplishments and impact statistics
4. Organizational capacity and expertise
5. Previous similar projects or relevant experience`;
      
      case 'Statement of Need':
        return `${baseContent}Clearly articulate the problem or need your project will address. Use data and evidence to establish the significance of this need.

Suggested structure:
1. Define the problem with specific data points
2. Describe who is affected and how
3. Explain the root causes
4. Discuss why this need is urgent
5. Connect to the funder's priorities outlined in the RFP`;
      
      case 'Project Description':
        return `${baseContent}Provide a detailed description of your proposed project, including activities, methods, and participants.

Suggested structure:
1. Overview of project approach
2. Detailed explanation of project components
3. Implementation methodology
4. Target population and beneficiaries
5. Service delivery model`;
      
      case 'Goals and Objectives':
        return `${baseContent}Define the specific goals of your project and measurable objectives that will help achieve those goals.

Suggested structure:
1. Overall goal statement
2. 3-5 SMART objectives (Specific, Measurable, Achievable, Relevant, Time-bound)
3. Key activities that support each objective
4. Anticipated outputs and outcomes
5. How objectives align with funder priorities`;
        
      case 'Implementation Timeline':
        return `${baseContent}Present a realistic timeline showing key activities, milestones, and deadlines throughout the grant period.

Suggested structure:
1. Project preparation phase activities
2. Implementation phase key activities
3. Major milestones and deliverables
4. Monitoring and evaluation activities
5. Reporting periods`;
        
      case 'Evaluation Plan':
        return `${baseContent}Describe how you will measure the success of your project and track progress toward your objectives.

Suggested structure:
1. Evaluation methodology
2. Key indicators and metrics
3. Data collection methods
4. Analysis approach
5. Reporting and utilization of findings`;
        
      case 'Budget Narrative':
        return `${baseContent}Explain and justify the requested budget items, ensuring they align with your project activities.

Suggested structure:
1. Personnel costs justification
2. Operational expenses explanation
3. Equipment and supply needs justification
4. Any special budget considerations
5. Cost effectiveness rationale`;
        
      case 'Sustainability Plan':
        return `${baseContent}Explain how the project or its benefits will continue after the grant funding ends.

Suggested structure:
1. Long-term vision for the project
2. Potential future funding sources
3. Community partnerships that support sustainability
4. Capacity building elements
5. Replication or scaling strategies`;
        
      default:
        return `${baseContent}Draft your content for this section based on the grant requirements. Include specific examples, data, and supporting evidence where appropriate.`;
    }
  };
  
  // Function to handle AI assistance
  const requestAiHelp = () => {
    setShowAiHelper(true);
    
    // Simulate AI generating a response
    setTimeout(() => {
      const responses: Record<string, string> = {
        'Executive Summary': "Your executive summary should be written last but appear first in your proposal. Make sure it answers: What is the need? What will you do? Who will benefit? How much will it cost? How will you measure success?",
        'Organizational Background': "Focus on your organization's proven track record in similar projects. Include metrics from past successes that are relevant to this grant's objectives.",
        'Statement of Need': "For this specific grant, emphasize the community statistics that align with the funder's priorities. They particularly value data-driven needs assessments.",
        'Goals and Objectives': "This funder prefers seeing 3-5 SMART objectives with corresponding activities and measurable outcomes for each. Be very specific about your metrics."
      };
      
      setAiResponse(responses[activeSection] || `Based on my analysis of similar successful applications, your ${activeSection} section should include specific examples that demonstrate your organization's expertise and commitment to sustainability. Include quantifiable data wherever possible.`);
    }, 1000);
  };
  
  // Handle section content updates
  const updateSectionContent = (content: string) => {
    setSectionContents({
      ...sectionContents,
      [activeSection]: content
    });
  };
  
  // Handle adding a new section
  const addNewSection = () => {
    if (extraSectionName && !identifiedSections.includes(extraSectionName)) {
      setIdentifiedSections([...identifiedSections, extraSectionName]);
      setSectionContents({
        ...sectionContents,
        [extraSectionName]: `Draft your content for ${extraSectionName} here.`
      });
      setExtraSectionName('');
      
      toast({
        title: "Section Added",
        description: `${extraSectionName} has been added to your application.`,
      });
    }
  };
  
  // Handle saving the application
  const saveApplication = () => {
    toast({
      title: "Application Saved",
      description: "Your application has been saved as a draft.",
    });
    navigate('/applications');
  };
  
  // Handle submitting the application
  const submitApplication = () => {
    toast({
      title: "Application Submitted",
      description: "Your application has been submitted successfully.",
    });
    navigate('/applications');
  };

  // Show RFP Analysis loading screen
  if (isAnalyzingRfp) {
    return (
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Navbar />
          <div className="dashboard-container p-6">
            <div className="max-w-2xl mx-auto mt-10">
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-center text-fundsprout-dark">Analyzing Grant Requirements</CardTitle>
                  <CardDescription className="text-center">
                    We're reviewing the RFP to identify required sections and prepare your application
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 px-8 py-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Identifying required sections</span>
                      <span>{analyzingProgress}%</span>
                    </div>
                    <Progress value={analyzingProgress} className="h-2" />
                  </div>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded-full bg-fundsprout-light flex items-center justify-center text-fundsprout-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Writing Tips for Executive Summary</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Be concise but comprehensive. Include your organization name, project purpose, funding amount requested, and timeframe.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded-full bg-fundsprout-light flex items-center justify-center text-fundsprout-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Writing Tips for Statement of Need</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Use data to demonstrate the need. Explain why your approach is effective and necessary.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded-full bg-fundsprout-light flex items-center justify-center text-fundsprout-dark">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
                      </div>
                      <div>
                        <h3 className="font-medium">Writing Tips for Goals & Objectives</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Create SMART objectives (Specific, Measurable, Achievable, Relevant, Time-bound). Link each to your overall project goal.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Show Application Creator
  if (isCreatingApplication) {
    return (
      <div className="app-container">
        <Sidebar />
        
        <div className="main-content">
          <Navbar />
          
          <div className="dashboard-container p-6">
            <div className="mb-4">
              <button 
                onClick={() => navigate('/applications')} 
                className="text-gray-600 flex items-center hover:text-fundsprout-primary"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left mr-1"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                Back to Applications
              </button>
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-fundsprout-dark">
                New Application
              </h1>
              <div className="flex gap-3">
                <Button variant="outline" onClick={saveApplication}>Save Draft</Button>
                <Button className="bg-fundsprout-primary hover:bg-fundsprout-dark" onClick={submitApplication}>Submit Application</Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Left sidebar - Sections navigation */}
              <div className="lg:col-span-1 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Application Sections</CardTitle>
                    <CardDescription>Based on grant requirements</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="max-h-96 overflow-y-auto">
                      {identifiedSections.map((section, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setActiveSection(section);
                            setShowAiHelper(false);
                          }}
                          className={`w-full text-left p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${activeSection === section ? 'bg-fundsprout-light text-fundsprout-dark font-medium' : ''}`}
                        >
                          <div className="flex items-center">
                            <span>{section}</span>
                            {sectionContents[section]?.trim().length > 50 ? (
                              <span className="ml-auto">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"/></svg>
                              </span>
                            ) : null}
                          </div>
                        </button>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <div className="w-full space-y-2">
                      <Label htmlFor="new-section">Add Custom Section</Label>
                      <div className="flex gap-2">
                        <Input 
                          id="new-section" 
                          placeholder="Section name" 
                          value={extraSectionName} 
                          onChange={(e) => setExtraSectionName(e.target.value)}
                        />
                        <Button 
                          variant="outline" 
                          onClick={addNewSection}
                          disabled={!extraSectionName}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
                
                {/* Document Management */}
                <Card>
                  <CardHeader>
                    <CardTitle>Documents</CardTitle>
                    <CardDescription>Upload supporting materials</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                      Upload Document
                    </Button>
                    
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
                          <span className="text-sm">Org_Chart.pdf</span>
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
                    <CardDescription>Team members working on this application</CardDescription>
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
                    <Button variant="outline" className="w-full">
                      Invite Collaborator
                    </Button>
                  </CardContent>
                </Card>
              </div>
              
              {/* Main content - Section editor */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>{activeSection}</CardTitle>
                    <CardDescription>
                      Edit this section of your application
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
                      Auto-saved
                    </div>
                    <Button 
                      onClick={requestAiHelp}
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-text"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M8 7h6"/><path d="M8 11h8"/></svg>
                      Get Writing Tips
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Navigation between sections */}
                {identifiedSections.length > 0 && (
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      disabled={identifiedSections.indexOf(activeSection) === 0}
                      onClick={() => {
                        const currentIndex = identifiedSections.indexOf(activeSection);
                        if (currentIndex > 0) {
                          setActiveSection(identifiedSections[currentIndex - 1]);
                          setShowAiHelper(false);
                        }
                      }}
                    >
                      Previous Section
                    </Button>
                    <Button 
                      variant="outline"
                      disabled={identifiedSections.indexOf(activeSection) === identifiedSections.length - 1}
                      onClick={() => {
                        const currentIndex = identifiedSections.indexOf(activeSection);
                        if (currentIndex < identifiedSections.length - 1) {
                          setActiveSection(identifiedSections[currentIndex + 1]);
                          setShowAiHelper(false);
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open text-fundsprout-primary"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                        Writing Assistant
                      </CardTitle>
                      <CardDescription>
                        Tips for writing your {activeSection} section
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
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
                                description: "Writing suggestion added to your section.",
                              });
                            }}
                            className="text-xs"
                          >
                            Use Suggestion
                          </Button>
                        </div>
                      </div>
                      
                      <div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full mt-2"
                          onClick={() => {
                            setShowAiHelper(false);
                          }}
                        >
                          Close Tips
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Application Overview</CardTitle>
                      <CardDescription>Progress on application sections</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {identifiedSections.map((section, index) => {
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
                              Object.values(sectionContents).filter(content => content && content.length > 50).length / identifiedSections.length * 100
                            )}%
                          </span>
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
  }

  // Regular applications list view
  return (
    <div className="app-container">
      <Sidebar />
      
      <div className="main-content">
        <Navbar />
        
        <div className="dashboard-container p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-fundsprout-dark">Applications</h1>
            <Button className="bg-fundsprout-primary hover:bg-fundsprout-dark">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus mr-1"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              New Application
            </Button>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <Tabs 
              defaultValue="all" 
              className="mb-6"
              value={selectedTab}
              onValueChange={setSelectedTab}
            >
              <TabsList>
                <TabsTrigger value="all">All Applications</TabsTrigger>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
                <TabsTrigger value="submitted">Submitted</TabsTrigger>
                <TabsTrigger value="awarded">Awarded</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
            </Tabs>
            
            {filteredApplications.length === 0 ? (
              <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
                <div className="max-w-md mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text mx-auto mb-4 text-fundsprout-primary"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><line x1="10" x2="8" y1="9" y2="9"/></svg>
                  <h2 className="text-xl font-semibold mb-2">No Applications Found</h2>
                  <p className="text-gray-600 mb-6">
                    Start your grant application journey by selecting a grant opportunity from your matched grants.
                  </p>
                  <Button className="bg-fundsprout-primary hover:bg-fundsprout-dark">
                    Explore Grant Matches
                  </Button>
                </div>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="text-sm text-gray-700 border-b border-gray-200">
                    <tr>
                      <th className="text-left pb-3 font-medium">Grant</th>
                      <th className="text-left pb-3 font-medium">Organization</th>
                      <th className="text-left pb-3 font-medium">Due Date</th>
                      <th className="text-left pb-3 font-medium">Amount</th>
                      <th className="text-left pb-3 font-medium">Status</th>
                      <th className="text-left pb-3 font-medium">Progress</th>
                      <th className="text-right pb-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredApplications.map((application) => (
                      <tr key={application.id} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/applications/${application.id}`)}>
                        <td className="py-4 pr-8">
                          <div className="font-medium text-fundsprout-dark">{application.grantTitle}</div>
                        </td>
                        <td className="py-4 pr-8">{application.organization}</td>
                        <td className="py-4 pr-8">
                          <div className="text-sm">
                            {new Date(application.dueDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}
                          </div>
                        </td>
                        <td className="py-4 pr-8">{application.amount}</td>
                        <td className="py-4 pr-8">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(application.status)}`}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-4 pr-8 w-36">
                          <div className="flex items-center space-x-2">
                            <Progress value={application.progress} className="h-2" />
                            <span className="text-xs text-gray-500">{application.progress}%</span>
                          </div>
                        </td>
                        <td className="py-4 text-right">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/applications/${application.id}`);
                            }} 
                            className="hover:bg-fundsprout-light hover:text-fundsprout-dark"
                          >
                            {application.status === 'draft' ? 'Continue' : 'View'}
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;
