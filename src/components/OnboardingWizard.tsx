
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';

interface OnboardingStep {
  title: string;
  description: string;
  fields: React.ReactNode;
}

const OnboardingWizard: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  
  // Mock form data states
  const [orgName, setOrgName] = useState('');
  const [orgDescription, setOrgDescription] = useState('');
  const [orgType, setOrgType] = useState('');
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([]);

  const focusAreas = [
    { id: 'education', label: 'Education' },
    { id: 'health', label: 'Health & Wellness' },
    { id: 'environment', label: 'Environment' },
    { id: 'arts', label: 'Arts & Culture' },
    { id: 'community', label: 'Community Development' },
    { id: 'social', label: 'Social Services' },
  ];

  const toggleFocusArea = (id: string) => {
    setSelectedFocusAreas(prev => 
      prev.includes(id) 
        ? prev.filter(area => area !== id)
        : [...prev, id]
    );
  };

  const steps: OnboardingStep[] = [
    {
      title: "Welcome to Fundsprout",
      description: "Let's set up your organization profile to help you find perfect grant matches.",
      fields: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="org-name">Organization Name</Label>
            <Input 
              id="org-name" 
              placeholder="Enter your organization's name" 
              value={orgName}
              onChange={(e) => setOrgName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="org-type">Organization Type</Label>
            <Select value={orgType} onValueChange={setOrgType}>
              <SelectTrigger>
                <SelectValue placeholder="Select organization type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="501c3">501(c)(3) Nonprofit</SelectItem>
                <SelectItem value="501c4">501(c)(4) Social Welfare</SelectItem>
                <SelectItem value="government">Government Entity</SelectItem>
                <SelectItem value="educational">Educational Institution</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="org-description">Mission Statement</Label>
            <Textarea 
              id="org-description" 
              placeholder="Describe your organization's mission and purpose"
              value={orgDescription}
              onChange={(e) => setOrgDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
        </div>
      )
    },
    {
      title: "Define Your Focus Areas",
      description: "Select the primary focus areas of your work to help us find relevant grants.",
      fields: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {focusAreas.map((area) => (
              <div key={area.id} className="flex items-start space-x-2">
                <Checkbox 
                  id={area.id} 
                  checked={selectedFocusAreas.includes(area.id)}
                  onCheckedChange={() => toggleFocusArea(area.id)}
                />
                <Label htmlFor={area.id} className="font-normal">{area.label}</Label>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "Import Organization Data",
      description: "Connect to external systems to auto-populate your profile and improve grant matches.",
      fields: (
        <div className="space-y-6">
          <Card className="shadow-sm border-dashed border-2 hover:border-fundsprout-primary cursor-pointer transition-colors">
            <CardContent className="p-4 flex items-center space-x-4">
              <div className="h-12 w-12 bg-fundsprout-light rounded-md flex items-center justify-center text-fundsprout-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
              <div>
                <h3 className="font-medium">Connect to GuideStar</h3>
                <p className="text-sm text-gray-500">Import your nonprofit data and financials</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm border-dashed border-2 hover:border-fundsprout-primary cursor-pointer transition-colors">
            <CardContent className="p-4 flex items-center space-x-4">
              <div className="h-12 w-12 bg-fundsprout-light rounded-md flex items-center justify-center text-fundsprout-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-folder"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>
              </div>
              <div>
                <h3 className="font-medium">Import from Google Drive</h3>
                <p className="text-sm text-gray-500">Upload existing grant documents</p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center text-sm text-gray-500 mt-4">
            You can always connect these services later from your organization settings
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCompleted(true);
      // In a real app, we would save the data here
      localStorage.setItem('onboarding-completed', 'true');
      toast.success('Organization profile created successfully');
      navigate('/discovery');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem('onboarding-completed', 'true');
    navigate('/discovery');
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-3xl p-6 bg-white rounded-xl shadow-lg">
        <div className="flex items-center mb-8">
          <div className="w-10 h-10 rounded-md bg-fundsprout-primary flex items-center justify-center text-white font-bold mr-3">
            FS
          </div>
          <span className="text-xl font-bold text-fundsprout-dark">Fundsprout</span>
        </div>

        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold">{currentStepData.title}</h2>
            <span className="text-sm text-gray-500">Step {currentStep + 1} of {steps.length}</span>
          </div>
          <p className="text-gray-600">{currentStepData.description}</p>
        </div>

        <div className="mb-8">
          {currentStepData.fields}
        </div>

        <div className="flex justify-between pt-4 border-t border-gray-100">
          <div>
            {currentStep > 0 ? (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            ) : (
              <Button variant="ghost" onClick={handleSkip}>
                Skip for now
              </Button>
            )}
          </div>
          <Button className="bg-fundsprout-primary hover:bg-fundsprout-dark" onClick={handleNext}>
            {currentStep < steps.length - 1 ? 'Next' : 'Complete Setup'}
          </Button>
        </div>

        <div className="flex justify-center mt-6">
          <div className="flex space-x-2">
            {steps.map((_, index) => (
              <div 
                key={index} 
                className={`h-2 w-${index === currentStep ? '8' : '2'} rounded-full ${
                  index === currentStep 
                    ? 'bg-fundsprout-primary' 
                    : index < currentStep 
                      ? 'bg-gray-400' 
                      : 'bg-gray-200'
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingWizard;
