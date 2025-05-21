
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
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

interface OnboardingStep {
  title: string;
  description: string;
  fields: React.ReactNode;
}

const OnboardingWizard: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completed, setCompleted] = useState(false);
  
  // Organization data states
  const [orgName, setOrgName] = useState('');
  const [orgDescription, setOrgDescription] = useState('');
  const [orgType, setOrgType] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [headquarters, setHeadquarters] = useState('');
  const [operatingLocations, setOperatingLocations] = useState('');
  const [foundingYear, setFoundingYear] = useState('');
  const [employeeCount, setEmployeeCount] = useState('');
  const [selectedFocusAreas, setSelectedFocusAreas] = useState<string[]>([]);
  const [uploadsComplete, setUploadsComplete] = useState<Record<string, boolean>>({
    resume: false,
    financials: false,
    taxForms: false,
    programInfo: false
  });

  const focusAreas = [
    { id: 'education', label: 'Education' },
    { id: 'health', label: 'Health & Wellness' },
    { id: 'environment', label: 'Environment' },
    { id: 'arts', label: 'Arts & Culture' },
    { id: 'community', label: 'Community Development' },
    { id: 'social', label: 'Social Services' },
    { id: 'research', label: 'Research & Innovation' },
    { id: 'international', label: 'International Affairs' },
    { id: 'youth', label: 'Youth Services' },
    { id: 'elderly', label: 'Elderly Care' }
  ];

  const toggleFocusArea = (id: string) => {
    setSelectedFocusAreas(prev => 
      prev.includes(id) 
        ? prev.filter(area => area !== id)
        : [...prev, id]
    );
  };

  const handleUploadSimulation = (documentType: string) => {
    // Simulate file upload
    toast.promise(
      new Promise<void>((resolve) => {
        setTimeout(() => {
          setUploadsComplete(prev => ({
            ...prev,
            [documentType]: true
          }));
          resolve();
        }, 1500);
      }),
      {
        loading: `Uploading ${documentType} document...`,
        success: `${documentType} successfully uploaded!`,
        error: 'Upload failed. Please try again.'
      }
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="founding-year">Year Founded</Label>
              <Input 
                id="founding-year" 
                placeholder="e.g., 2010" 
                value={foundingYear}
                onChange={(e) => setFoundingYear(e.target.value)}
              />
            </div>
            
            <div>
              <Label htmlFor="employee-count">Number of Employees</Label>
              <Input 
                id="employee-count" 
                placeholder="e.g., 25" 
                type="number"
                value={employeeCount}
                onChange={(e) => setEmployeeCount(e.target.value)}
              />
            </div>
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
            <Label htmlFor="website">Website URL</Label>
            <Input 
              id="website" 
              placeholder="e.g., https://yourorganization.org" 
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
            />
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
      title: "Locations & Operations",
      description: "Tell us where your organization is based and where you operate.",
      fields: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="headquarters">Headquarters Location</Label>
            <Input 
              id="headquarters" 
              placeholder="City, State, Country" 
              value={headquarters}
              onChange={(e) => setHeadquarters(e.target.value)}
            />
          </div>
          
          <div>
            <Label htmlFor="operating-locations">Operating Locations</Label>
            <Textarea 
              id="operating-locations" 
              placeholder="List all cities, states, or countries where your organization operates"
              value={operatingLocations}
              onChange={(e) => setOperatingLocations(e.target.value)}
              className="min-h-[100px]"
            />
            <FormDescription className="text-sm text-gray-500 mt-1">
              Separate multiple locations with commas (e.g., "New York, NY; Los Angeles, CA; London, UK")
            </FormDescription>
          </div>
          
          <div>
            <Label className="block mb-2">Focus Areas</Label>
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
        </div>
      )
    },
    {
      title: "Document Upload Center",
      description: "Upload key documents to enhance your grant applications and improve matching.",
      fields: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className={`shadow-sm border-2 ${uploadsComplete.resume ? 'bg-green-50 border-green-300' : 'border-dashed hover:border-fundsprout-primary'} cursor-pointer transition-colors`} 
              onClick={() => !uploadsComplete.resume && handleUploadSimulation('resume')}>
              <CardContent className="p-4 flex items-center space-x-4">
                <div className="h-12 w-12 rounded-md flex items-center justify-center text-fundsprout-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13.5v-2a1.5 1.5 0 0 0-1.5-1.5h-2a1.5 1.5 0 0 0-1.5 1.5v2a1.5 1.5 0 0 0 1.5 1.5h2a1.5 1.5 0 0 0 1.5-1.5Z"/><path d="M12 20h4"/><path d="M8 20h.01"/></svg>
                </div>
                <div>
                  <h3 className="font-medium">Staff Resumes/CVs</h3>
                  <p className="text-sm text-gray-500">Upload key staff resumes/CVs to showcase expertise</p>
                  {uploadsComplete.resume && <p className="text-sm text-green-600 mt-1">✓ Uploaded</p>}
                </div>
              </CardContent>
            </Card>
            
            <Card className={`shadow-sm border-2 ${uploadsComplete.financials ? 'bg-green-50 border-green-300' : 'border-dashed hover:border-fundsprout-primary'} cursor-pointer transition-colors`}
              onClick={() => !uploadsComplete.financials && handleUploadSimulation('financials')}>
              <CardContent className="p-4 flex items-center space-x-4">
                <div className="h-12 w-12 rounded-md flex items-center justify-center text-fundsprout-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="M8 18v-1"/><path d="M16 18v-3"/></svg>
                </div>
                <div>
                  <h3 className="font-medium">Financial Statements</h3>
                  <p className="text-sm text-gray-500">Upload latest financial reports</p>
                  {uploadsComplete.financials && <p className="text-sm text-green-600 mt-1">✓ Uploaded</p>}
                </div>
              </CardContent>
            </Card>
            
            <Card className={`shadow-sm border-2 ${uploadsComplete.taxForms ? 'bg-green-50 border-green-300' : 'border-dashed hover:border-fundsprout-primary'} cursor-pointer transition-colors`}
              onClick={() => !uploadsComplete.taxForms && handleUploadSimulation('taxForms')}>
              <CardContent className="p-4 flex items-center space-x-4">
                <div className="h-12 w-12 rounded-md flex items-center justify-center text-fundsprout-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M9 13h6"/><path d="M9 17h6"/><path d="M9 9h1"/></svg>
                </div>
                <div>
                  <h3 className="font-medium">Tax Forms/501(c)(3) Documentation</h3>
                  <p className="text-sm text-gray-500">Upload tax exemption forms</p>
                  {uploadsComplete.taxForms && <p className="text-sm text-green-600 mt-1">✓ Uploaded</p>}
                </div>
              </CardContent>
            </Card>
            
            <Card className={`shadow-sm border-2 ${uploadsComplete.programInfo ? 'bg-green-50 border-green-300' : 'border-dashed hover:border-fundsprout-primary'} cursor-pointer transition-colors`}
              onClick={() => !uploadsComplete.programInfo && handleUploadSimulation('programInfo')}>
              <CardContent className="p-4 flex items-center space-x-4">
                <div className="h-12 w-12 rounded-md flex items-center justify-center text-fundsprout-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M10.5 12a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Z"/><path d="M20 13.5c0 2.5-4 3.5-8 3.5s-8-1-8-3.5V8c0-2.5 4-3.5 8-3.5s8 1 8 3.5Z"/><path d="M8.5 14.5c0 1 4 2 6 .5"/></svg>
                </div>
                <div>
                  <h3 className="font-medium">Program Information</h3>
                  <p className="text-sm text-gray-500">Upload brochures, impact reports, or program descriptions</p>
                  {uploadsComplete.programInfo && <p className="text-sm text-green-600 mt-1">✓ Uploaded</p>}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center text-sm text-gray-500 mt-4">
            You can add more documents later from your organization settings
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
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="7.5 4.21 12 6.81 16.5 4.21"/><polyline points="7.5 19.79 7.5 14.6 3 12"/><polyline points="21 12 16.5 14.6 16.5 19.79"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              </div>
              <div>
                <h3 className="font-medium">Connect to Salesforce</h3>
                <p className="text-sm text-gray-500">Import contact data and donor records</p>
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
