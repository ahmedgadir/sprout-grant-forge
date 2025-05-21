
import { ApplicationSection, ApplicationQuestion, AIResponse } from '@/types/application';

export const mockApplicationSections: ApplicationSection[] = [
  {
    id: 'org-info',
    title: 'Organization Information',
    description: 'Provide basic information about your organization',
    type: 'questions',
    required: true,
    completed: true,
    order: 1,
    content: JSON.stringify({
      'org-name': 'Greenfield Community Action',
      'org-mission': 'To build a more equitable, sustainable, and thriving Greenfield community by empowering residents and fostering collaborative solutions to local challenges.',
      'org-year': '2010',
      'org-tax-id': '12-3456789'
    })
  },
  {
    id: 'project-summary',
    title: 'Project Summary',
    description: 'Provide a concise overview of your project',
    type: 'questions',
    required: true,
    completed: false,
    order: 2
  },
  {
    id: 'need-statement',
    title: 'Need Statement',
    description: 'Explain the problem or need your project addresses',
    type: 'text',
    required: true,
    completed: false,
    order: 3
  },
  {
    id: 'goals-objectives',
    title: 'Goals and Objectives',
    description: 'Define the specific goals and objectives of your project',
    type: 'text',
    required: true,
    completed: false,
    order: 4
  },
  {
    id: 'methodology',
    title: 'Methodology',
    description: 'Describe how you will accomplish your objectives',
    type: 'text',
    required: true,
    completed: false,
    order: 5
  },
  {
    id: 'evaluation',
    title: 'Evaluation Plan',
    description: 'Explain how you will measure success',
    type: 'text',
    required: true,
    completed: false,
    order: 6
  },
  {
    id: 'budget',
    title: 'Budget',
    description: 'Provide a detailed budget for your project',
    type: 'budget',
    required: true,
    completed: false,
    order: 7
  },
  {
    id: 'timeline',
    title: 'Project Timeline',
    description: 'Provide a timeline for your project activities',
    type: 'timeline',
    required: true,
    completed: false,
    order: 8
  },
  {
    id: 'sustainability',
    title: 'Sustainability Plan',
    description: 'Describe how the project will be sustained after grant funding ends',
    type: 'text',
    required: false,
    completed: false,
    order: 9
  },
  {
    id: 'attachments',
    title: 'Attachments',
    description: 'Upload required documents',
    type: 'upload',
    required: true,
    completed: false,
    order: 10
  }
];

export const mockApplicationQuestions: ApplicationQuestion[] = [
  {
    id: 'org-name',
    sectionId: 'org-info',
    text: 'Organization Name',
    required: true,
    answer: 'Greenfield Community Action'
  },
  {
    id: 'org-mission',
    sectionId: 'org-info',
    text: 'Mission Statement',
    helpText: 'Provide your organization\'s mission statement.',
    required: true,
    answer: 'To build a more equitable, sustainable, and thriving Greenfield community by empowering residents and fostering collaborative solutions to local challenges.'
  },
  {
    id: 'org-year',
    sectionId: 'org-info',
    text: 'Year Founded',
    required: true,
    answer: '2010'
  },
  {
    id: 'org-tax-id',
    sectionId: 'org-info',
    text: 'Tax ID / EIN',
    required: true,
    answer: '12-3456789'
  },
  {
    id: 'project-title',
    sectionId: 'project-summary',
    text: 'Project Title',
    required: true
  },
  {
    id: 'project-summary',
    sectionId: 'project-summary',
    text: 'Project Summary',
    helpText: 'Provide a brief summary of your project (250 words max).',
    placeholder: 'Briefly describe your project and its primary goals...',
    required: true,
    wordLimit: 250
  },
  {
    id: 'project-amount',
    sectionId: 'project-summary',
    text: 'Amount Requested',
    helpText: 'Enter the total amount you are requesting from this grant.',
    required: true
  },
  {
    id: 'project-duration',
    sectionId: 'project-summary',
    text: 'Project Duration',
    helpText: 'Enter the expected duration of your project in months.',
    required: true
  }
];

export const mockAIResponses: AIResponse[] = [
  {
    id: '1',
    sectionType: 'need-statement',
    keywords: ['need', 'problem', 'issue', 'challenge'],
    response: `The Greenfield neighborhood faces significant challenges in youth education access and outcomes. 
    Recent data shows that only 65% of students in the area complete high school, compared to the county average of 87%. 
    Additionally, 40% of families in our service area report difficulty accessing quality after-school programs due to 
    cost barriers and transportation limitations. These issues are compounded by a 28% reduction in public education funding 
    over the past five years, resulting in the elimination of many enrichment programs that once supported student engagement 
    and academic success. Through community surveys and focus groups conducted over the past year, we've identified that 
    students lack safe, supportive environments for homework help, skilled mentorship in STEM subjects, and exposure to 
    career pathways that could inspire their academic journey.`
  },
  {
    id: '2',
    sectionType: 'goals-objectives',
    keywords: ['goals', 'objectives', 'outcomes', 'results'],
    response: `Goal 1: Increase academic performance for 150 underserved youth in the Greenfield neighborhood.
    - Objective 1.1: Provide structured after-school tutoring to 150 students (grades 6-12) for 10 hours weekly.
    - Objective 1.2: Achieve a 25% improvement in participants' grade point averages by the end of the academic year.
    - Objective 1.3: Ensure 90% of participating seniors graduate high school on time.
    
    Goal 2: Enhance STEM skills and interest among program participants.
    - Objective 2.1: Deliver hands-on STEM workshops twice weekly to all participants.
    - Objective 2.2: Facilitate 12 field trips to local STEM-focused businesses and college departments.
    - Objective 2.3: Increase interest in STEM careers by 35% as measured by pre/post program surveys.
    
    Goal 3: Build a sustainable mentorship network connecting youth with career professionals.
    - Objective 3.1: Recruit and train 25 volunteer mentors from local STEM industries.
    - Objective 3.2: Match every participant with a mentor who meets with them at least twice monthly.
    - Objective 3.3: Establish formal partnerships with 5 local employers to provide job shadowing opportunities.`
  },
  {
    id: '3',
    sectionType: 'methodology',
    keywords: ['method', 'approach', 'process', 'implement', 'strategy'],
    response: `Our project employs a multi-faceted approach centered on evidence-based practices for youth development:

    1. Structured Academic Support: We will implement the nationally-recognized "Success Builders" curriculum, which provides tailored academic support through small group instruction (5:1 student-teacher ratio). Certified teachers will lead these sessions four days weekly, focusing on core academic subjects and developing study skills.
    
    2. STEM Enrichment: We'll partner with local university science departments to deliver bi-weekly workshops using the "STEM Explorers" hands-on curriculum. These workshops will be led by university students and faculty, introducing participants to concepts in robotics, coding, environmental science, and engineering through project-based learning.
    
    3. Mentorship Component: Using the validated "Career Pathways" mentorship model, we'll match participants with professionals in STEM fields for regular mentoring sessions. Mentors will receive 8 hours of initial training and ongoing support to ensure quality interactions focused on academic encouragement and career guidance.
    
    4. Parent Engagement: Monthly family workshops will equip parents with strategies to support their children's academic success, including navigating college applications and financial aid processes.
    
    5. Case Management: Each participant will receive individualized support from a program coordinator who will monitor progress, coordinate services, and connect families with additional community resources as needed.`
  },
  {
    id: '4',
    sectionType: 'evaluation',
    keywords: ['evaluate', 'measure', 'assess', 'metrics', 'success'],
    response: `Our evaluation plan utilizes a mixed-methods approach to comprehensively assess program effectiveness:

    Quantitative Measures:
    1. Academic Performance: We will track participants' grades quarterly, comparing pre-program and post-program GPAs. Success target: 25% average improvement.
    2. Attendance Records: Daily attendance will be monitored to ensure consistent participation. Success target: 85% average attendance rate.
    3. Standardized Test Scores: We will compare participants' standardized test scores against school and district averages. Success target: Participants show 20% greater improvement than non-participating peers.
    4. High School Graduation Rates: For senior participants, we will track on-time graduation. Success target: 90% graduation rate.
    
    Qualitative Assessments:
    1. Pre/Post Surveys: Participants will complete validated surveys measuring attitudes toward education, STEM interest, and career aspirations at program start and conclusion.
    2. Focus Groups: Quarterly focus groups with participants, parents, and mentors will provide insights into program strengths and challenges.
    3. Teacher Feedback: Semi-annual feedback forms from participants' classroom teachers will assess behavioral and academic changes observed.
    
    Data Analysis & Reporting:
    Our evaluation consultant will compile quarterly reports analyzing program outcomes. An independent evaluator will conduct a comprehensive annual assessment, with findings presented to stakeholders and used to refine program delivery.`
  },
  {
    id: '5',
    sectionType: 'budget',
    keywords: ['budget', 'cost', 'expense', 'financial', 'funding'],
    response: `Personnel: $120,000
    - Program Director (0.5 FTE): $35,000
    - Program Coordinators (2 FTE): $80,000
    - Academic Tutors (part-time): $45,000
    
    Supplies and Materials: $22,000
    - Academic supplies: $8,000
    - STEM workshop materials: $10,000
    - Technology (laptops, tablets): $4,000
    
    Professional Services: $18,000
    - Curriculum licensing: $5,000
    - Evaluation consultant: $8,000
    - Staff training: $5,000
    
    Program Operations: $40,000
    - Transportation for field trips: $12,000
    - Facility costs: $20,000
    - Insurance: $8,000
    
    Participant Support: $35,000
    - Meal program: $15,000
    - Incentives and rewards: $5,000
    - Scholarship fund: $15,000
    
    Administrative Overhead (10%): $23,500
    
    Total Project Budget: $258,500
    Amount Requested: $175,000
    Matching Funds: $83,500`
  },
  {
    id: '6',
    sectionType: 'sustainability',
    keywords: ['sustain', 'continue', 'future', 'long-term', 'maintain'],
    response: `Our sustainability strategy ensures program continuation beyond the grant period through a layered approach:

    1. Diversified Funding: We have established a 3-year funding plan that progressively transitions from grant dependency to diversified revenue sources:
       - Year 1: 70% grant funding, 20% community partners, 10% individual donors
       - Year 2: 50% grant funding, 30% community partners, 15% individual donors, 5% earned income
       - Year 3: 30% grant funding, 35% community partners, 20% individual donors, 15% earned income
    
    2. Community Partnerships: We have secured letters of commitment from three local businesses (TechWave Solutions, Greenfield Medical Center, and First State Bank) to provide $15,000 annually for three years. Additionally, our partnership with Greenfield Community College includes in-kind support valued at $25,000 annually through facility use and student volunteer coordination.
    
    3. Capacity Building: We will launch a development committee in month three of the project, recruiting board members and volunteers with fundraising expertise to implement:
       - An annual fundraising event projected to raise $30,000 by year three
       - A monthly giving program targeting 200 community members by project end
       - Corporate volunteer/donation matching programs with five local employers
    
    4. Infrastructure Development: Grant funds will be used to develop systems that reduce future costs:
       - Training volunteers as program facilitators
       - Creating a comprehensive curriculum library
       - Implementing a robust evaluation system that demonstrates program impact for future funders
    
    5. Support Integration: By year three, core elements of the program will be integrated into existing community infrastructure, with the school district incorporating our STEM curriculum and the community center providing dedicated space for program activities.`
  },
  {
    id: '7',
    keywords: ['default', 'general'],
    response: `Based on successful grant applications in this area, we recommend:

    1. Be specific about your project's impact. Use concrete numbers, percentages, and measurable outcomes rather than general statements.
    
    2. Connect your proposal directly to the funder's stated priorities. Reviewers look for alignment between your project and their mission.
    
    3. Demonstrate evidence-based approaches. Reference research or proven models that support your methodology.
    
    4. Show community involvement. Highlight partnerships, community input, and collaborative approaches in your project.
    
    5. Address sustainability. Explain how your project will continue after grant funding ends.
    
    6. Be concise but comprehensive. Use clear, direct language and avoid jargon or technical terms without explanation.
    
    7. Include compelling stories alongside data. Personal narratives about those who will benefit help reviewers connect emotionally to your cause.`
  }
];
