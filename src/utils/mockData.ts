export interface Grant {
  id: string;
  title: string;
  organization: string;
  amount: string;
  deadline: string;
  description: string;
  matchPercentage: number;
  logoUrl: string;
  tags: string[];
  status?: 'recommended' | 'in-progress' | 'submitted' | 'awarded' | 'rejected';
}

export interface Activity {
  id: string;
  type: 'application' | 'deadline' | 'submission' | 'comment' | 'award';
  title: string;
  description: string;
  timestamp: string;
  user?: User;
  relatedId?: string; // Added relatedId property to the Activity interface
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl: string;
}

export interface Organization {
  id: string;
  name: string;
  description: string;
  mission: string;
  yearFounded: number;
  size: string;
  budget: string;
  location: string;
  website: string;
  taxId: string;
}

export interface Application {
  id: string;
  grantId: string;
  grantTitle: string;
  organization: string;
  status: 'draft' | 'submitted' | 'awarded' | 'rejected';
  submissionDate?: string;
  dueDate: string;
  progress: number;
  amount: string;
  team: User[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: 'deadline' | 'meeting' | 'submission' | 'report';
  relatedId?: string;
  description: string;
}

export interface Report {
  id: string;
  title: string;
  grantId: string;
  grantTitle: string;
  type: 'progress' | 'financial' | 'compliance' | 'final';
  dueDate: string;
  submissionDate?: string;
  status: 'upcoming' | 'submitted' | 'approved';
  fileUrl?: string;
}

export const mockGrants: Grant[] = [
  {
    id: '1',
    title: 'Community Development Block Grant',
    organization: 'U.S. Department of Housing',
    amount: '$250,000',
    deadline: '2025-07-15',
    description: 'Provides funding for community development activities to build stronger and more resilient communities.',
    matchPercentage: 94,
    logoUrl: '/placeholder.svg',
    tags: ['Community Development', 'Infrastructure', 'Housing'],
    status: 'recommended',
  },
  {
    id: '2',
    title: 'Environmental Justice Small Grants Program',
    organization: 'Environmental Protection Agency',
    amount: '$75,000',
    deadline: '2025-06-22',
    description: 'Supports communities working on solutions to local environmental and public health issues.',
    matchPercentage: 92,
    logoUrl: '/placeholder.svg',
    tags: ['Environmental', 'Community', 'Justice'],
    status: 'recommended',
  },
  {
    id: '3',
    title: 'Rural Business Development Grant',
    organization: 'USDA Rural Development',
    amount: '$120,000',
    deadline: '2025-08-01',
    description: 'Provides funding for technical assistance and training for rural small businesses.',
    matchPercentage: 88,
    logoUrl: '/placeholder.svg',
    tags: ['Rural', 'Business', 'Development'],
    status: 'recommended',
  },
  {
    id: '4',
    title: 'Arts and Humanities Grant',
    organization: 'National Endowment for the Arts',
    amount: '$50,000',
    deadline: '2025-09-15',
    description: 'Supports projects that engage the public with diverse and excellent art.',
    matchPercentage: 82,
    logoUrl: '/placeholder.svg',
    tags: ['Arts', 'Culture', 'Community'],
  },
  {
    id: '5',
    title: 'Community Innovation Challenge',
    organization: 'Robertson Foundation',
    amount: '$175,000',
    deadline: '2025-08-30',
    description: 'Funds innovative solutions to address critical community needs.',
    matchPercentage: 78,
    logoUrl: '/placeholder.svg',
    tags: ['Innovation', 'Community', 'Technology'],
  },
  {
    id: '6',
    title: 'Health Equity Grant',
    organization: 'Johnson Health Foundation',
    amount: '$200,000',
    deadline: '2025-07-30',
    description: 'Supports initiatives to reduce health disparities and promote health equity.',
    matchPercentage: 75,
    logoUrl: '/placeholder.svg',
    tags: ['Health', 'Equity', 'Community'],
  },
  {
    id: '7',
    title: 'Digital Literacy Program',
    organization: 'Tech Forward Alliance',
    amount: '$90,000',
    deadline: '2025-09-01',
    description: 'Expands digital literacy skills and access to technology in underserved communities.',
    matchPercentage: 73,
    logoUrl: '/placeholder.svg',
    tags: ['Technology', 'Education', 'Digital'],
  },
  {
    id: '8',
    title: 'Youth Development Initiative',
    organization: 'Children\'s Future Fund',
    amount: '$125,000',
    deadline: '2025-08-15',
    description: 'Supports programs that foster positive youth development and leadership skills.',
    matchPercentage: 70,
    logoUrl: '/placeholder.svg',
    tags: ['Youth', 'Education', 'Development'],
    status: 'in-progress',
  }
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'application',
    title: 'Community Development Block Grant',
    description: 'Application started',
    timestamp: '2025-05-18T10:30:00Z',
    user: {
      id: '1',
      name: 'Jane Smith',
      email: 'jane@example.org',
      role: 'Grant Writer',
      avatarUrl: '/placeholder.svg'
    },
    relatedId: '1' // Added relatedId matching to the grant ID
  },
  {
    id: '2',
    type: 'comment',
    title: 'Youth Development Initiative',
    description: 'Added notes to budget section',
    timestamp: '2025-05-17T16:45:00Z',
    user: {
      id: '2',
      name: 'Robert Johnson',
      email: 'robert@example.org',
      role: 'Director',
      avatarUrl: '/placeholder.svg'
    },
    relatedId: '8' // Added relatedId matching to the grant ID
  },
  {
    id: '3',
    type: 'deadline',
    title: 'Environmental Justice Small Grants Program',
    description: 'Deadline in 5 days',
    timestamp: '2025-05-17T09:00:00Z',
    relatedId: '2' // Added relatedId matching to the grant ID
  },
  {
    id: '4',
    type: 'submission',
    title: 'Rural Business Development Grant',
    description: 'Final proposal submitted',
    timestamp: '2025-05-15T14:20:00Z',
    user: {
      id: '1',
      name: 'Jane Smith',
      email: 'jane@example.org',
      role: 'Grant Writer',
      avatarUrl: '/placeholder.svg'
    },
    relatedId: '3' // Added relatedId matching to the grant ID
  },
  {
    id: '5',
    type: 'award',
    title: 'Technology Innovation Fund',
    description: 'Grant awarded - $75,000',
    timestamp: '2025-05-10T11:15:00Z',
    relatedId: '5' // Added relatedId matching to a grant ID
  }
];

export const mockOrganization: Organization = {
  id: '1',
  name: 'Greenfield Community Action',
  description: 'A nonprofit organization dedicated to improving the quality of life in Greenfield through community development, education, and environmental initiatives.',
  mission: 'To build a more equitable, sustainable, and thriving Greenfield community by empowering residents and fostering collaborative solutions to local challenges.',
  yearFounded: 2010,
  size: '15-25 employees',
  budget: '$1.2M annual',
  location: 'Greenfield, CA',
  website: 'www.greenfieldaction.org',
  taxId: '12-3456789',
};

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Jane Smith',
    email: 'jane@example.org',
    role: 'Grant Writer',
    avatarUrl: '/placeholder.svg'
  },
  {
    id: '2',
    name: 'Robert Johnson',
    email: 'robert@example.org',
    role: 'Executive Director',
    avatarUrl: '/placeholder.svg'
  },
  {
    id: '3',
    name: 'Maria Rodriguez',
    email: 'maria@example.org',
    role: 'Program Manager',
    avatarUrl: '/placeholder.svg'
  }
];

export const mockDashboardStats = {
  totalGrantsFound: 42,
  highMatchGrants: 8,
  grantsInProgress: 3,
  submittedApplications: 12,
  awardedGrants: 5,
  totalFundingReceived: '$725,000',
  upcomingDeadlines: 4,
};

export const mockApplications: Application[] = [
  {
    id: '1',
    grantId: '1',
    grantTitle: 'Community Development Block Grant',
    organization: 'U.S. Department of Housing',
    status: 'draft',
    dueDate: '2025-07-15',
    progress: 35,
    amount: '$250,000',
    team: [mockUsers[0], mockUsers[1]]
  },
  {
    id: '2',
    grantId: '8',
    grantTitle: 'Youth Development Initiative',
    organization: 'Children\'s Future Fund',
    status: 'draft',
    dueDate: '2025-08-15',
    progress: 68,
    amount: '$125,000',
    team: [mockUsers[0], mockUsers[2]]
  },
  {
    id: '3',
    grantId: '3',
    grantTitle: 'Rural Business Development Grant',
    organization: 'USDA Rural Development',
    status: 'submitted',
    submissionDate: '2025-05-15',
    dueDate: '2025-08-01',
    progress: 100,
    amount: '$120,000',
    team: [mockUsers[1]]
  },
  {
    id: '4',
    grantId: '5',
    grantTitle: 'Community Innovation Challenge',
    organization: 'Robertson Foundation',
    status: 'awarded',
    submissionDate: '2025-04-12',
    dueDate: '2025-04-30',
    progress: 100,
    amount: '$175,000',
    team: [mockUsers[0], mockUsers[1], mockUsers[2]]
  },
  {
    id: '5',
    grantId: '7',
    grantTitle: 'Digital Literacy Program',
    organization: 'Tech Forward Alliance',
    status: 'rejected',
    submissionDate: '2025-04-05',
    dueDate: '2025-04-15',
    progress: 100,
    amount: '$90,000',
    team: [mockUsers[2]]
  }
];

export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: '1',
    title: 'Community Development Block Grant Deadline',
    date: '2025-07-15',
    type: 'deadline',
    relatedId: '1',
    description: 'Final submission deadline for the Community Development Block Grant application.'
  },
  {
    id: '2',
    title: 'Environmental Justice Grant Deadline',
    date: '2025-06-22',
    type: 'deadline',
    relatedId: '2',
    description: 'Final submission deadline for the Environmental Justice Small Grants Program.'
  },
  {
    id: '3',
    title: 'Team Meeting - Youth Development Initiative',
    date: '2025-05-25',
    type: 'meeting',
    relatedId: '8',
    description: 'Planning meeting to discuss application strategy for the Youth Development Initiative grant.'
  },
  {
    id: '4',
    title: 'Progress Report Due - Community Innovation',
    date: '2025-06-15',
    type: 'report',
    relatedId: '5',
    description: 'First quarterly progress report due for the Community Innovation Challenge grant.'
  },
  {
    id: '5',
    title: 'Grant Review Meeting with Board',
    date: '2025-06-05',
    type: 'meeting',
    description: 'Present current grant applications and strategy to the board of directors.'
  },
  {
    id: '6',
    title: 'Submit Rural Business Development Application',
    date: '2025-07-25',
    type: 'submission',
    relatedId: '3',
    description: 'Final review and submission of the Rural Business Development Grant application.'
  },
  {
    id: '7',
    title: 'Financial Report Due',
    date: '2025-07-30',
    type: 'report',
    description: 'Quarterly financial report due for all active grants.'
  }
];

export const mockReports: Report[] = [
  {
    id: '1',
    title: 'Q1 2025 Progress Report',
    grantId: '4',
    grantTitle: 'Arts and Humanities Grant',
    type: 'progress',
    dueDate: '2025-04-15',
    submissionDate: '2025-04-10',
    status: 'approved',
    fileUrl: '/placeholder.svg'
  },
  {
    id: '2',
    title: 'Financial Compliance Report',
    grantId: '5',
    grantTitle: 'Community Innovation Challenge',
    type: 'financial',
    dueDate: '2025-05-30',
    status: 'upcoming',
    fileUrl: '/placeholder.svg'
  },
  {
    id: '3',
    title: 'Mid-Year Program Evaluation',
    grantId: '4',
    grantTitle: 'Arts and Humanities Grant',
    type: 'progress',
    dueDate: '2025-07-15',
    status: 'upcoming',
    fileUrl: '/placeholder.svg'
  },
  {
    id: '4',
    title: 'Annual Compliance Documentation',
    grantId: '5',
    grantTitle: 'Community Innovation Challenge',
    type: 'compliance',
    dueDate: '2025-03-31',
    submissionDate: '2025-03-28',
    status: 'submitted',
    fileUrl: '/placeholder.svg'
  },
  {
    id: '5',
    title: 'Final Project Report',
    grantId: '7',
    grantTitle: 'Digital Literacy Program',
    type: 'final',
    dueDate: '2025-02-15',
    submissionDate: '2025-02-10',
    status: 'approved',
    fileUrl: '/placeholder.svg'
  }
];
