
# Fundsprout - Grant Management Solution

Fundsprout is a comprehensive web application designed to streamline the grant application process for nonprofit organizations. It helps users find, match, apply for, and track grants through an intuitive interface powered by AI-assistance.

## Project info

**URL**: https://lovable.dev/projects/29b9f9ce-3f02-4fed-8ba1-ee663734644c

## Features Implemented

- **Grant Discovery Dashboard**: View matched grants with key information and metrics
- **Grant Detail View**: Comprehensive information about each grant opportunity
- **AI-Powered Application Assistant**: Generate and modify grant application drafts with AI assistance
- **Match Scoring System**: Algorithm to determine the fit between your organization and available grants
- **Responsive UI**: Modern interface that works across devices

## Key Files and Components

- **src/pages/Index.tsx**: Main dashboard showing matched grants and recent activity
- **src/pages/GrantDetail.tsx**: Detailed view of a specific grant with match information
- **src/pages/ReportCreator.tsx**: AI-assisted grant application editor with side panel for suggestions
- **src/pages/Applications.tsx**: View and manage in-progress and submitted applications
- **src/pages/FindGrants.tsx**: Search interface for discovering new grant opportunities
- **src/pages/Reports.tsx**: View and manage generated reports
- **src/components/Sidebar.tsx**: Main navigation component
- **src/components/MatchedGrants.tsx**: Displays grants that match the organization's profile
- **src/components/RecentActivity.tsx**: Shows recent actions taken in the application
- **src/utils/mockData.ts**: Contains sample data for development purposes

## Implementation Progress

So far, we have implemented:

1. **RFP Analysis and Auto-Population**: When clicking "Start Application," the system analyzes the Request for Proposal (RFP) and pre-fills application sections with AI-generated content.

2. **AI-Powered Writing Assistant**: The application includes a side panel with AI suggestions to help users write and modify their draft content.

3. **Report Creation Workflow**: A dedicated interface for creating grant applications with AI assistance, including a "Generate AI Draft" button.

4. **Grant Matching**: Algorithm that calculates the percentage match between organizations and grant opportunities.

5. **Grant Detail View**: Comprehensive view of grant information including award amount, deadlines, and match analysis.

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/29b9f9ce-3f02-4fed-8ba1-ee663734644c) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/29b9f9ce-3f02-4fed-8ba1-ee663734644c) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
