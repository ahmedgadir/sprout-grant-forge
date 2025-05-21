
export interface ApplicationSection {
  id: string;
  title: string;
  description: string;
  type: 'text' | 'questions' | 'budget' | 'timeline' | 'upload';
  content?: string;
  required: boolean;
  completed: boolean;
  order: number;
  toggleCompletion?: () => void;
}

export interface ApplicationQuestion {
  id: string;
  sectionId: string;
  text: string;
  helpText?: string;
  placeholder?: string;
  required: boolean;
  wordLimit?: number;
  answer?: string;
}

export interface AIResponse {
  id: string;
  sectionType?: 'text' | 'questions' | 'budget' | 'timeline' | 'upload';
  keywords: string[];
  response: string;
}
