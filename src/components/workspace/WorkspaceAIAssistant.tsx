
import React, { useState, useEffect } from 'react';
import { ApplicationSection } from '@/types/application';
import { Grant } from '@/utils/mockData';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { mockAIResponses } from '@/utils/mockApplicationData';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, MessageCircle, FileText, Check } from 'lucide-react';

interface WorkspaceAIAssistantProps {
  section: ApplicationSection | undefined;
  grant: Grant;
  onClose: () => void;
  onInsertText: (text: string) => void;
}

const WorkspaceAIAssistant: React.FC<WorkspaceAIAssistantProps> = ({
  section,
  grant,
  onClose,
  onInsertText
}) => {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [response, setResponse] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [rfpAnalysis, setRfpAnalysis] = useState<{
    coverage: number;
    keywords: number;
    suggestions: string[];
  }>({
    coverage: 0,
    keywords: 0,
    suggestions: []
  });
  const [activeConversation, setActiveConversation] = useState<Array<{role: 'user' | 'ai', content: string}>>([]);
  
  // Generate section-specific AI suggestions when section changes
  useEffect(() => {
    if (section) {
      generateSectionSuggestions();
      analyzeRfpAlignment();
    }
  }, [section]);
  
  const generateSectionSuggestions = () => {
    if (!section) return;
    
    setSuggestions([]);
    setGenerating(true);
    
    // Simulate AI suggestion generation
    setTimeout(() => {
      const sectionSuggestions = {
        'org-info': [
          "Highlight your organization's track record with similar initiatives.",
          "Include quantifiable impact metrics from past projects.",
          "Mention any relevant certifications or recognitions."
        ],
        'project-summary': [
          "Begin with a compelling problem statement that establishes urgency.",
          "Clearly articulate how your approach is innovative or unique.",
          "Connect your project goals directly to the funder's stated priorities."
        ],
        'need-statement': [
          "Support your need statement with recent, relevant data.",
          "Include both statistical evidence and illustrative examples.",
          "Demonstrate that your organization understands root causes, not just symptoms."
        ],
        'goals-objectives': [
          "Ensure all objectives follow the SMART framework.",
          "Include a mix of short-term, medium-term, and long-term objectives.",
          "Connect each objective to your overall theory of change."
        ],
        'methodology': [
          "Break down your implementation approach into clear phases.",
          "Explain how each activity addresses the identified needs.",
          "Include a contingency plan for potential challenges."
        ],
        'budget': [
          "Provide clear justification for each budget line item.",
          "Demonstrate cost-effectiveness through comparisons or benchmarks.",
          "Include both direct and indirect costs with appropriate calculations."
        ]
      };
      
      setSuggestions(sectionSuggestions[section.id as keyof typeof sectionSuggestions] || [
        "Focus on connecting your content to the funder's strategic priorities.",
        "Use clear, concrete examples rather than general statements.",
        "Quantify impacts and outcomes whenever possible."
      ]);
      
      setGenerating(false);
    }, 1000);
  };
  
  const analyzeRfpAlignment = () => {
    if (!section) return;
    
    // Simulate RFP alignment analysis
    setTimeout(() => {
      // Generate random but realistic coverage and keyword alignment scores
      const coverage = Math.floor(Math.random() * 40) + 60; // 60-99%
      const keywords = Math.floor(Math.random() * 50) + 50; // 50-99%
      
      const suggestionsBySection = {
        'org-info': [
          "Consider addressing your organization's experience with similar populations.",
          "The RFP specifically asks about your current funding sources."
        ],
        'project-summary': [
          "Include a timeline overview as mentioned in the RFP guidelines.",
          "Address how your project aligns with the funder's equity framework."
        ],
        'need-statement': [
          "The RFP emphasizes community voice - include participatory needs assessment.",
          "Consider segmenting your data by demographic groups as requested."
        ],
        'goals-objectives': [
          "Include intermediate outcomes as specified in the RFP.",
          "Each objective should connect to one of the funder's priority areas."
        ],
        'methodology': [
          "The RFP requests details about partner organizations' roles.",
          "Include your participant recruitment and retention strategies."
        ]
      };
      
      setRfpAnalysis({
        coverage,
        keywords,
        suggestions: suggestionsBySection[section.id as keyof typeof suggestionsBySection] || [
          "Consider addressing the sustainability question mentioned in section 4.2 of the RFP.",
          "Include examples of past success as requested in the application guidelines."
        ]
      });
    }, 1500);
  };
  
  const handleGenerateResponse = () => {
    if (!prompt.trim()) return;
    
    setGenerating(true);
    setActiveConversation(prev => [...prev, {role: 'user', content: prompt}]);
    
    // Simulate AI generation delay
    setTimeout(() => {
      // Find a mock response that matches or get the default
      const aiResponse = mockAIResponses.find(
        r => r.sectionType === section?.type || r.keywords.some(k => prompt.toLowerCase().includes(k))
      ) || mockAIResponses[0];
      
      const newResponse = aiResponse.response;
      setResponse(newResponse);
      setActiveConversation(prev => [...prev, {role: 'ai', content: newResponse}]);
      setPrompt('');
      setGenerating(false);
    }, 1500);
  };
  
  const handleInsert = () => {
    if (response) {
      onInsertText(response);
    }
  };

  const applySuggestion = (suggestion: string) => {
    onInsertText(suggestion);
  };
  
  return (
    <div className="w-80 border-l flex flex-col h-full bg-gray-50 overflow-hidden">
      <div className="p-3 border-b bg-white flex items-center justify-between">
        <h3 className="font-medium flex items-center gap-1.5">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          AI Assistant
        </h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {/* RFP Alignment Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-1.5">
              <FileText className="h-4 w-4 text-blue-500" />
              RFP Alignment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Required elements</span>
                <span className="font-medium">{rfpAnalysis.coverage}%</span>
              </div>
              <Progress value={rfpAnalysis.coverage} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Keyword alignment</span>
                <span className="font-medium">{rfpAnalysis.keywords}%</span>
              </div>
              <Progress value={rfpAnalysis.keywords} className="h-2" />
            </div>
            
            {rfpAnalysis.suggestions.length > 0 && (
              <div className="pt-2 space-y-2">
                <p className="text-xs font-medium">RFP-specific suggestions:</p>
                {rfpAnalysis.suggestions.map((suggestion, index) => (
                  <div key={index} className="bg-blue-50 border border-blue-100 rounded-md p-2 text-xs text-blue-800">
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Section Suggestions */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-1.5">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              Smart Suggestions
            </CardTitle>
            <CardDescription className="text-xs">
              AI-powered tips for {section?.title}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {generating ? (
              <div className="p-4 text-center">
                <p className="text-sm text-gray-500 mb-2">Generating suggestions...</p>
                <Progress value={65} className="h-2" />
              </div>
            ) : (
              <div>
                {suggestions.map((suggestion, index) => (
                  <div key={index} className="border-b last:border-0">
                    <div className="p-2.5 text-sm relative group">
                      <p>{suggestion}</p>
                      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="h-6 w-6 p-0 rounded-full"
                          onClick={() => applySuggestion(suggestion)}
                        >
                          <Check className="h-3.5 w-3.5" />
                          <span className="sr-only">Apply</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button 
              size="sm" 
              variant="outline" 
              className="w-full"
              onClick={generateSectionSuggestions}
              disabled={generating}
            >
              Refresh Suggestions
            </Button>
          </CardFooter>
        </Card>
        
        {/* AI Conversation */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-1.5">
              <MessageCircle className="h-4 w-4 text-green-500" />
              AI Chat
            </CardTitle>
          </CardHeader>
          <CardContent className="max-h-80 overflow-y-auto">
            {activeConversation.length > 0 ? (
              <div className="space-y-3">
                {activeConversation.map((message, index) => (
                  <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div 
                      className={`max-w-[85%] p-2 rounded-lg text-sm ${
                        message.role === 'user' 
                          ? 'bg-fundsprout-primary text-white' 
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      <p>{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-6 text-center">
                <MessageCircle className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                <p className="text-sm text-gray-400">Ask the AI for help with your application</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t pt-3">
            <div className="w-full space-y-2">
              <Textarea 
                placeholder="Ask for help with your application..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="resize-none text-sm"
                rows={2}
              />
              <Button 
                className="w-full bg-fundsprout-primary hover:bg-fundsprout-dark"
                disabled={!prompt.trim() || generating}
                onClick={handleGenerateResponse}
              >
                {generating ? 'Generating...' : 'Send'}
              </Button>
              {response && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleInsert}
                  className="w-full mt-2"
                >
                  Insert into document
                </Button>
              )}
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default WorkspaceAIAssistant;
