
import React, { useState } from 'react';
import { ApplicationSection } from '@/types/application';
import { Grant } from '@/utils/mockData';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { mockAIResponses } from '@/utils/mockApplicationData';

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
  
  const handleGenerateResponse = () => {
    if (!prompt.trim()) return;
    
    setGenerating(true);
    
    // Simulate AI generation delay
    setTimeout(() => {
      // Find a mock response that matches or get the default
      const aiResponse = mockAIResponses.find(
        r => r.sectionType === section?.type || r.keywords.some(k => prompt.toLowerCase().includes(k))
      ) || mockAIResponses[0];
      
      setResponse(aiResponse.response);
      setGenerating(false);
    }, 1500);
  };
  
  const handleInsert = () => {
    if (response) {
      onInsertText(response);
    }
  };
  
  return (
    <div className="w-80 border-l flex flex-col h-full bg-white">
      <div className="p-3 border-b flex items-center justify-between">
        <h3 className="font-medium">AI Assistant</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
      </div>
      
      <div className="p-3 border-b">
        <div className="text-sm font-medium mb-2">Ask AI for help with:</div>
        <div className="space-y-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start text-left"
            onClick={() => setPrompt(`Help me write content for the "${section?.title}" section`)}
          >
            Write content for this section
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start text-left"
            onClick={() => setPrompt(`Provide examples for "${section?.title}"`)}
          >
            Provide examples
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-start text-left"
            onClick={() => setPrompt(`What makes a strong "${section?.title}" for this grant?`)}
          >
            What makes a strong response?
          </Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3">
        {response && (
          <div className="bg-gray-50 p-3 rounded-md mb-3">
            <div className="text-sm font-medium mb-1">AI Suggestion:</div>
            <p className="text-sm">{response}</p>
            <div className="mt-3">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={handleInsert}
              >
                Insert into document
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <div className="border-t p-3">
        <Textarea
          placeholder="Ask for help with your application..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="mb-2 text-sm resize-none"
          rows={3}
        />
        <Button 
          className="w-full bg-fundsprout-primary hover:bg-fundsprout-dark"
          disabled={!prompt.trim() || generating}
          onClick={handleGenerateResponse}
        >
          {generating ? 'Generating...' : 'Generate Response'}
        </Button>
      </div>
    </div>
  );
};

export default WorkspaceAIAssistant;
