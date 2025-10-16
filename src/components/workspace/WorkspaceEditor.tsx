
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
  const [userThoughts, setUserThoughts] = useState('');
  const [isGeneratingSuggestion, setIsGeneratingSuggestion] = useState(false);
  const { toast } = useToast();
  
  // Find questions for this section
  const questions = section ? mockApplicationQuestions.filter(q => q.sectionId === section.id) : [];

  // Generate section suggestion based on the current section
  useEffect(() => {
    if (section) {
      generateSectionSuggestion();
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
              
              {/* RFP Questions */}
              {rfpQuestions.length > 0 && (
                <Card className="mb-6 bg-blue-50 border-blue-100">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-blue-800 flex items-center gap-1">
                      <FileText className="h-4 w-4" /> 
                      RFP Questions to Address
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-blue-700 space-y-2">
                      {rfpQuestions.map((question, index) => (
                        <li key={index} className="flex gap-2">
                          <span className="font-semibold">{index + 1}.</span>
                          <span>{question}</span>
                        </li>
                      ))}
                    </ul>
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
            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Quick Actions</CardTitle>
                <CardDescription className="text-xs">Generate content with one click</CardDescription>
              </CardHeader>
              <CardContent className="pt-0 space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-left h-auto py-2 text-sm"
                  onClick={() => {
                    applyAiSuggestion("Based on the RFP requirements, our approach will focus on community engagement through participatory methods that directly involve the target population in both planning and implementation phases.");
                  }}
                >
                  Generate content from RFP
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-left h-auto py-2 text-sm"
                  onClick={() => {
                    applyAiSuggestion("Our organization has successfully implemented five similar projects over the past three years, reaching over 10,000 beneficiaries and achieving measurable outcomes in line with funder expectations.");
                  }}
                >
                  Add organizational background
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-left h-auto py-2 text-sm"
                  onClick={() => {
                    applyAiSuggestion("Key outcomes will include: 1) 30% increase in program participation, 2) 40% improvement in community health metrics, 3) Establishment of 5 sustainable community partnerships, and 4) Development of a replicable model for future initiatives.");
                  }}
                >
                  Add expected outcomes
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full justify-start text-left h-auto py-2 text-sm"
                  onClick={() => {
                    applyAiSuggestion("Our evaluation plan includes both qualitative and quantitative measures, with data collection occurring at baseline, mid-point, and project conclusion to ensure comprehensive impact assessment.");
                  }}
                >
                  Add evaluation approach
                </Button>
              </CardContent>
            </Card>
            
            {/* AI Chat */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-1">
                  <MessageCircle className="h-4 w-4 text-green-500" /> 
                  Ask AI
                </CardTitle>
                <CardDescription className="text-xs">
                  Get help with specific questions
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="w-full space-y-2">
                  <Textarea 
                    placeholder="Ask a question about this section..."
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
