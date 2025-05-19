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
