
import React, { useState } from 'react';
import { ApplicationSection } from '@/types/application';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { mockApplicationQuestions } from '@/utils/mockApplicationData';

interface WorkspaceEditorProps {
  section: ApplicationSection | undefined;
  onChange: (content: string) => void;
}

const WorkspaceEditor: React.FC<WorkspaceEditorProps> = ({ section, onChange }) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  
  if (!section) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-gray-500">Select a section to begin editing</p>
      </div>
    );
  }
  
  // Find questions for this section
  const questions = mockApplicationQuestions.filter(q => q.sectionId === section.id);

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="border-b px-4 py-2">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'edit' | 'preview')} className="w-full">
          <TabsList>
            <TabsTrigger value="edit">Edit</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        <TabsContent value="edit" className="m-0">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
            <p className="text-gray-600">{section.description}</p>
          </div>
          
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
                    value={question.answer || ''}
                    onChange={(e) => {
                      const updatedContent = JSON.stringify({
                        ...JSON.parse(section.content || '{}'),
                        [question.id]: e.target.value
                      });
                      onChange(updatedContent);
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
        </TabsContent>
        
        <TabsContent value="preview" className="m-0">
          <div className="bg-white p-4 border rounded-md">
            <h2 className="text-xl font-semibold mb-4">{section.title}</h2>
            
            {questions.length > 0 ? (
              <div className="space-y-6">
                {questions.map(question => {
                  const content = section.content ? JSON.parse(section.content) : {};
                  const answer = content[question.id] || '';
                  
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
      </div>
      
      <div className="border-t p-4">
        <div className="flex justify-between">
          <div>
            {section.required && (
              <span className="text-xs text-red-500">* Required section</span>
            )}
          </div>
          <div>
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
  );
};

export default WorkspaceEditor;
