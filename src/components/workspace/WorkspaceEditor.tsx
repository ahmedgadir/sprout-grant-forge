
import React, { useState, useEffect } from 'react';
import { ApplicationSection } from '@/types/application';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { mockApplicationQuestions } from '@/utils/mockApplicationData';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, AlertTriangle, FileText, MessageCircle, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WorkspaceEditorProps {
  section: ApplicationSection | undefined;
  onChange: (content: string) => void;
}

const WorkspaceEditor: React.FC<WorkspaceEditorProps> = ({ section, onChange }) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [showAiSuggestions, setShowAiSuggestions] = useState(true);
  const [rfpFile, setRfpFile] = useState<File | null>(null);
  const [isAnalyzingRfp, setIsAnalyzingRfp] = useState(false);
  const [rfpQuestions, setRfpQuestions] = useState<string[]>([]);
  const [rfpResponses, setRfpResponses] = useState<{[question: string]: string}>({});
  const [userThoughts, setUserThoughts] = useState('');
  const [isGeneratingSuggestion, setIsGeneratingSuggestion] = useState(false);
  const { toast } = useToast();
  
  // Find questions for this section
  const questions = section ? mockApplicationQuestions.filter(q => q.sectionId === section.id) : [];

  // Contextual quick actions based on section type
  const getSectionActions = () => {
    if (!section) return [];

    const sectionActions = {
      'org-info': [
        {
          title: 'Add organizational background',
          content: "Our organization has successfully implemented five similar projects over the past three years, reaching over 10,000 beneficiaries and achieving measurable outcomes in line with funder expectations."
        },
        {
          title: 'Add team expertise',
          content: "Our team includes certified professionals with an average of 8+ years of experience in this field. Key personnel have managed similar grants totaling over $2.5M in the last five years."
        },
        {
          title: 'Add past achievements',
          content: "Over the past three years, our programs have resulted in a 35% improvement in community outcomes, recognized through three industry awards and featured as a case study in sector publications."
        }
      ],
      'project-summary': [
        {
          title: 'Add innovative approach',
          content: "Our approach innovates by combining proven methodologies with emerging technologies, creating a hybrid model that addresses gaps in traditional service delivery while maintaining cost-effectiveness."
        },
        {
          title: 'Add alignment with RFP',
          content: "This project directly addresses priorities outlined in Section 2.3 of the RFP by implementing a community-centered approach that emphasizes sustainability and measurable outcomes."
        },
        {
          title: 'Add project scope',
          content: "The project will serve approximately 1,500 participants across three target communities during the 24-month implementation period, with phased expansion planned for years 2-3."
        }
      ],
      'need-statement': [
        {
          title: 'Add statistical evidence',
          content: "Recent data from the County Health Department shows that residents in our target neighborhoods face significant health disparities, with 35% higher rates of chronic disease and 42% less access to preventive care compared to citywide averages."
        },
        {
          title: 'Add community context',
          content: "These disparities disproportionately affect communities of color and low-income residents, with 48% reporting delays in seeking care due to cost concerns (Community Health Survey, 2024)."
        },
        {
          title: 'Add gap analysis',
          content: "Despite these challenges, existing services reach only 30% of the eligible population, leaving a significant gap that this project aims to address through innovative community-based approaches."
        }
      ],
      'goals-objectives': [
        {
          title: 'Add SMART objectives',
          content: "Goal 1: Improve access to preventive healthcare services in target communities.\n- Objective 1.1: Establish 4 community wellness hubs by Q3 2025, serving at least 2,500 residents each annually.\n- Objective 1.2: Increase preventive care utilization by 40% among program participants within 18 months.\n- Objective 1.3: Achieve 85% satisfaction rate among service recipients as measured by quarterly surveys."
        },
        {
          title: 'Add capacity building goal',
          content: "Goal 2: Build community capacity for sustained health improvement.\n- Objective 2.1: Train 120 community health advocates by end of year 1, with 85% retention rate.\n- Objective 2.2: Develop partnerships with at least 15 local organizations by month 6.\n- Objective 2.3: Create sustainable funding model with at least 30% of budget covered by diverse sources by project end."
        },
        {
          title: 'Add alignment with funder',
          content: "These goals directly support the funder's strategic priority areas of health equity, community empowerment, and sustainable impact as outlined in their 2025 funding guidelines."
        }
      ],
      'methodology': [
        {
          title: 'Add phased approach',
          content: "Our implementation strategy follows a phased approach:\n\nPhase 1 (Months 1-3): Community Engagement & Planning\n- Conduct community listening sessions in all target neighborhoods\n- Recruit and form community advisory board\n- Finalize site selections for wellness hubs\n\nPhase 2 (Months 4-9): Infrastructure & Capacity Building\n- Establish physical wellness hubs with necessary equipment and staffing\n- Develop training curriculum and begin community health advocate training\n- Create referral networks with existing healthcare providers"
        },
        {
          title: 'Add evidence-based practices',
          content: "Our methodology incorporates three evidence-based practices with demonstrated effectiveness in similar communities: 1) The Community Health Worker model (CDC, 2023), 2) Collective Impact Framework (Stanford Social Innovation Review), and 3) Trauma-Informed Care principles (SAMHSA)."
        },
        {
          title: 'Add implementation timeline',
          content: "Key implementation milestones include:\n- Month 1-2: Staff hiring and training\n- Month 3: Community advisory board established\n- Month 4: First hub operational\n- Month 6: All hubs operational\n- Month 8: First cohort of community advocates trained\n- Month 12: Mid-project evaluation and adjustment"
        }
      ],
      'evaluation': [
        {
          title: 'Add process metrics',
          content: "Process Metrics:\n- Number of individuals served (target: 10,000 annually)\n- Number of community health advocates trained (target: 120)\n- Service delivery hours completed (target: 8,000 hours annually)\n- Partner organization engagement (target: 15+ active partnerships)"
        },
        {
          title: 'Add outcome metrics',
          content: "Outcome Metrics:\n- Increase in preventive care utilization (target: 40% improvement)\n- Reduction in preventable emergency room visits (target: 25% reduction)\n- Improvement in self-reported health status (target: 30% improvement on standardized scale)\n- Community health knowledge gains (target: 50% improvement on pre/post assessments)"
        },
        {
          title: 'Add evaluation approach',
          content: "Our mixed-methods evaluation approach combines quantitative outcomes assessment with qualitative feedback through:\n- Quarterly participant surveys\n- Pre/post knowledge assessments\n- Focus groups with community members\n- Analysis of service utilization data\n- Stakeholder interviews\n\nAn external evaluator will oversee data collection and analysis to ensure objectivity."
        }
      ],
      'budget': [
        {
          title: 'Add personnel budget',
          content: "Personnel: $650,000\n- Project Director (1.0 FTE): $90,000\n- Program Managers (2.0 FTE): $140,000\n- Community Health Coordinators (4.0 FTE): $280,000\n- Data Analyst (1.0 FTE): $70,000\n- Administrative Assistant (1.0 FTE): $50,000\n- Fringe Benefits (15%): $94,500"
        },
        {
          title: 'Add operations budget',
          content: "Operations: $350,000\n- Hub Facilities (4 locations): $180,000\n- Equipment & Supplies: $85,000\n- Technology & Communications: $65,000\n- Transportation: $20,000"
        },
        {
          title: 'Add cost justification',
          content: "Cost-effectiveness is achieved through leveraging existing community spaces for hubs (saving approximately $120,000 in construction costs) and our train-the-trainer model that expands reach without proportional staff increases. Our cost per participant of $125 is 30% below industry average for similar interventions."
        }
      ]
    };
    
    // Return default actions if section type not found
    return sectionActions[section.id as keyof typeof sectionActions] || [
      {
        title: 'Generate content from RFP',
        content: "Based on the RFP requirements, our approach will focus on community engagement through participatory methods that directly involve the target population in both planning and implementation phases."
      },
      {
        title: 'Add organizational background',
        content: "Our organization has successfully implemented five similar projects over the past three years, reaching over 10,000 beneficiaries and achieving measurable outcomes in line with funder expectations."
      },
      {
        title: 'Add expected outcomes',
        content: "Key outcomes will include: 1) 30% increase in program participation, 2) 40% improvement in community health metrics, 3) Establishment of 5 sustainable community partnerships, and 4) Development of a replicable model for future initiatives."
      },
      {
        title: 'Add evaluation approach',
        content: "Our evaluation plan includes both qualitative and quantitative measures, with data collection occurring at baseline, mid-point, and project conclusion to ensure comprehensive impact assessment."
      }
    ];
  };

  const handleRfpQuestionResponseChange = (question: string, response: string) => {
    setRfpResponses(prev => ({
      ...prev,
      [question]: response
    }));
  };

  // Generate section suggestion based on the current section
  useEffect(() => {
    // Only generate suggestion when section changes, not on initial render
    if (section) {
      setIsGeneratingSuggestion(false); // Reset to prevent auto-generation
    }
  }, [section]);

  const generateSectionSuggestion = () => {
    if (!section) return;
    
    setIsGeneratingSuggestion(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      const suggestions = {
        'org-info': "Consider highlighting your organization's historical success with similar projects, particularly outcomes that align with this funder's priorities.",
        'project-summary': "Your project summary should emphasize the innovative aspects and potential impact. Quantify expected outcomes whenever possible.",
        'need-statement': "Strengthen your needs statement with recent statistical data about the target population and cite credible sources to establish urgency.",
        'goals-objectives': "Ensure all objectives follow the SMART framework (Specific, Measurable, Achievable, Relevant, Time-bound).",
        'methodology': "Describe your implementation approach in phases and connect each activity directly to your stated objectives.",
        'evaluation': "Include both process and outcome metrics in your evaluation plan, with a clear explanation of how data will be collected."
      };
      
      const suggestion = suggestions[section.id as keyof typeof suggestions] || 
        "Consider how this section relates to the funder's strategic priorities and make those connections explicit.";
        
      // Apply suggestion directly to the section  
      applyAiSuggestion(suggestion);
      
      setIsGeneratingSuggestion(false);
    }, 800);
  };

  const handleRfpUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setRfpFile(file);
    setIsAnalyzingRfp(true);
    
    // Simulate RFP analysis and question extraction
    setTimeout(() => {
      // Mock RFP questions relevant to the current section
      const extractedQuestions = [
        "How does your project address the primary challenges identified in the RFP?",
        "Describe your organization's experience with similar initiatives.",
        "What measurable outcomes do you expect within the first year?",
        "How will you ensure sustainability beyond the grant period?"
      ];
      
      setRfpQuestions(extractedQuestions);
      setIsAnalyzingRfp(false);
      
      // Initialize empty responses for each question
      const initialResponses: {[key: string]: string} = {};
      extractedQuestions.forEach(q => {
        initialResponses[q] = "";
      });
      setRfpResponses(initialResponses);
      
      toast({
        title: "RFP Analysis Complete",
        description: `${extractedQuestions.length} relevant questions extracted.`,
      });
    }, 2000);
  };
  
  const applyAiSuggestion = (suggestion: string) => {
    if (!section || !suggestion) return;
    
    // For text sections
    if (section.type === 'text') {
      const currentContent = section.content || '';
      onChange(currentContent + (currentContent ? '\n\n' : '') + suggestion);
    } 
    // For question sections
    else if (section.type === 'questions' && questions.length > 0) {
      try {
        const content = section.content ? JSON.parse(section.content) : {};
        
        // Apply suggestion to the first question answer
        const updatedContent = {
          ...content,
          [questions[0].id]: (content[questions[0].id] || '') + (content[questions[0].id] ? '\n\n' : '') + suggestion
        };
        
        onChange(JSON.stringify(updatedContent));
      } catch (error) {
        console.error("Error parsing section content:", error);
        // If content isn't valid JSON, create a new content object
        const newContent = {
          [questions[0].id]: suggestion
        };
        onChange(JSON.stringify(newContent));
      }
    }
    
    // Only show toast once when deliberately applying a suggestion
    toast({
      title: "Suggestion Applied",
      description: "AI suggestion has been added to your content."
    });
  };

  // Add user thoughts to the current section
  const addUserThoughts = () => {
    if (!userThoughts.trim() || !section) return;
    
    // For text sections
    if (section.type === 'text') {
      const currentContent = section.content || '';
      onChange(currentContent + (currentContent ? '\n\n' : '') + userThoughts);
    } 
    // For question sections
    else if (section.type === 'questions' && questions.length > 0) {
      try {
        const content = section.content ? JSON.parse(section.content) : {};
        
        // Apply user thoughts to the first question answer
        const updatedContent = {
          ...content,
          [questions[0].id]: (content[questions[0].id] || '') + (content[questions[0].id] ? '\n\n' : '') + userThoughts
        };
        
        onChange(JSON.stringify(updatedContent));
      } catch (error) {
        console.error("Error parsing section content:", error);
        // If content isn't valid JSON, create a new content object
        const newContent = {
          [questions[0].id]: userThoughts
        };
        onChange(JSON.stringify(newContent));
      }
    }
    
    setUserThoughts('');
    
    toast({
      title: "Thoughts Added",
      description: "Your notes have been added to the content."
    });
  };

  if (!section) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <FileText className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">Select a section to begin editing</p>
            <div className="mt-6">
              <Label htmlFor="rfp-upload" className="mb-2 block text-sm font-medium">
                Or upload an RFP document to get started
              </Label>
              <Input 
                id="rfp-upload" 
                type="file" 
                className="mt-1" 
                onChange={handleRfpUpload}
                accept=".pdf,.doc,.docx,.txt"
              />
              {isAnalyzingRfp && (
                <div className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">Analyzing RFP document...</p>
                  <Progress value={45} className="h-2" />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Safely parse JSON content for questions
  const getQuestionAnswer = (questionId: string) => {
    if (!section.content) return '';
    
    try {
      const content = JSON.parse(section.content);
      return content[questionId] || '';
    } catch (error) {
      console.error("Error parsing content:", error);
      return '';
    }
  };
  
  return (
    <div className="flex-1 flex overflow-hidden">
      {/* Main Editor Area */}
      <div className={`flex-1 flex flex-col overflow-hidden ${showAiSuggestions ? 'border-r' : ''}`}>
        <div className="border-b px-4 py-2">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'edit' | 'preview')} className="w-full">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="edit">Edit</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>
              
              <div className="flex items-center gap-2">
                {section.completed && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 flex gap-1 items-center">
                    <Check className="h-3 w-3" /> Complete
                  </Badge>
                )}
                {section.required && !section.completed && (
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200 flex gap-1 items-center">
                    <AlertTriangle className="h-3 w-3" /> Required
                  </Badge>
                )}
              </div>
            </div>

            <TabsContent value="edit" className="mt-4">
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                <p className="text-gray-600">{section.description}</p>
              </div>
              
              {/* RFP Questions with Response Fields */}
              {rfpQuestions.length > 0 && (
                <Card className="mb-6 bg-blue-50 border-blue-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-blue-800 flex items-center gap-1">
                      <FileText className="h-4 w-4" /> 
                      RFP Questions to Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {rfpQuestions.map((question, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex gap-2 text-blue-700">
                            <span className="font-semibold">{index + 1}.</span>
                            <span>{question}</span>
                          </div>
                          <Textarea 
                            placeholder="Enter your response to this question..."
                            className="bg-white border-blue-200 text-sm"
                            value={rfpResponses[question] || ''}
                            onChange={(e) => handleRfpQuestionResponseChange(question, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {questions.length > 0 ? (
                <div className="space-y-8">
                  {questions.map(question => (
                    <div key={question.id} className="editor-question-container">
                      <label className="block mb-2 text-sm font-medium">{question.text}</label>
                      {question.helpText && (
                        <p className="text-xs text-gray-500 mb-2">{question.helpText}</p>
                      )}
                      <Textarea 
                        id={`question-${question.id}`}
                        placeholder={question.placeholder || 'Enter your response here...'}
                        value={getQuestionAnswer(question.id)}
                        onChange={(e) => {
                          try {
                            const content = section.content ? JSON.parse(section.content) : {};
                            const updatedContent = JSON.stringify({
                              ...content,
                              [question.id]: e.target.value
                            });
                            onChange(updatedContent);
                          } catch (error) {
                            // If the content isn't valid JSON, start fresh
                            const newContent = {
                              [question.id]: e.target.value
                            };
                            onChange(JSON.stringify(newContent));
                          }
                        }}
                        className="min-h-32 resize-y"
                      />
                      {question.wordLimit && (
                        <div className="text-xs text-gray-500 mt-1 text-right">
                          Word limit: {question.wordLimit}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <Textarea 
                  placeholder="Enter your content here..."
                  value={section.content || ''}
                  onChange={(e) => onChange(e.target.value)}
                  className="min-h-[50vh] resize-y"
                />
              )}
              
              {/* User Thoughts Input */}
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Add Your Thoughts</h3>
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Add notes, ideas, or follow-up questions..."
                    value={userThoughts}
                    onChange={(e) => setUserThoughts(e.target.value)}
                    className="min-h-20 resize-y"
                  />
                  <Button 
                    onClick={addUserThoughts} 
                    className="self-end"
                    disabled={!userThoughts.trim()}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="preview" className="mt-4">
              <div className="bg-white p-4 border rounded-md">
                <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
                
                {/* Show RFP responses in preview */}
                {rfpQuestions.length > 0 && Object.values(rfpResponses).some(r => r.trim() !== '') && (
                  <div className="mb-6 p-3 bg-blue-50 rounded-md">
                    <h3 className="text-md font-medium mb-2 text-blue-800">RFP Questions and Responses</h3>
                    <div className="space-y-4">
                      {rfpQuestions.map((question, index) => (
                        rfpResponses[question] && rfpResponses[question].trim() !== '' && (
                          <div key={index} className="border-b border-blue-100 pb-3 last:border-0">
                            <h4 className="text-sm font-medium mb-1">{question}</h4>
                            <p className="text-sm">{rfpResponses[question]}</p>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}
                
                {questions.length > 0 ? (
                  <div className="space-y-6">
                    {questions.map(question => {
                      let answer = '';
                      
                      try {
                        if (section.content) {
                          const content = JSON.parse(section.content);
                          answer = content[question.id] || '';
                        }
                      } catch (error) {
                        console.error("Error parsing content in preview:", error);
                      }
                      
                      return (
                        <div key={question.id} className="mb-6">
                          <h3 className="text-lg font-medium mb-2">{question.text}</h3>
                          <div className="prose max-w-none">
                            {answer ? (
                              <p>{answer}</p>
                            ) : (
                              <p className="text-gray-400 italic">No content yet</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    {section.content ? (
                      <div>{section.content}</div>
                    ) : (
                      <p className="text-gray-400 italic">No content yet</p>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6">
          {/* The content is now managed by TabsContent above */}
        </div>
        
        <div className="border-t p-4">
          <div className="flex justify-between">
            <div>
              {section.required && (
                <span className="text-xs text-red-500">* Required section</span>
              )}
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                className="flex items-center gap-1"
                onClick={() => setShowAiSuggestions(!showAiSuggestions)}
              >
                <Lightbulb className="h-4 w-4" />
                {showAiSuggestions ? "Hide AI" : "Show AI"}
              </Button>
              <Button
                onClick={() => section.toggleCompletion && section.toggleCompletion()}
                variant={section.completed ? "default" : "outline"}
                size="sm"
                className={section.completed ? "bg-fundsprout-primary hover:bg-fundsprout-dark" : ""}
              >
                {section.completed ? "Completed" : "Mark as Complete"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Suggestions Panel - Simplified */}
      {showAiSuggestions && (
        <div className="w-80 flex flex-col bg-gray-50 overflow-hidden">
          <div className="p-3 border-b bg-white flex items-center justify-between">
            <h3 className="font-medium flex items-center gap-1">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              AI Writing Assistant
            </h3>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowAiSuggestions(false)}>
              <span className="sr-only">Close</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </Button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-3 space-y-4">
            {/* Section-specific Actions */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Quick Actions</CardTitle>
                <CardDescription className="text-xs">Add content for {section.title.toLowerCase()}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                {getSectionActions().map((action, index) => (
                  <Button 
                    key={index}
                    variant="outline" 
                    size="sm" 
                    className="w-full justify-start text-left h-auto py-2 text-sm"
                    onClick={() => {
                      applyAiSuggestion(action.content);
                    }}
                  >
                    {action.title}
                  </Button>
                ))}
              </CardContent>
            </Card>
            
            {/* AI Chat - Simplified */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-1">
                  <MessageCircle className="h-4 w-4 text-green-500" /> 
                  Ask AI
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="w-full space-y-2">
                  <Textarea 
                    placeholder={`Ask how to improve your ${section.title.toLowerCase()}...`}
                    className="min-h-[60px] text-sm resize-none"
                  />
                  <Button size="sm" className="w-full">Get Answer</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="border-t p-3 bg-white">
            <Button 
              onClick={generateSectionSuggestion} 
              disabled={isGeneratingSuggestion}
              className="w-full bg-fundsprout-primary hover:bg-fundsprout-dark"
            >
              {isGeneratingSuggestion ? "Generating..." : "Generate Section Content"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkspaceEditor;
