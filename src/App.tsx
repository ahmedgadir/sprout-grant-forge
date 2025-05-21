
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import FindGrants from "./pages/FindGrants";
import Applications from "./pages/Applications";
import GrantDetail from "./pages/GrantDetail";
import CalendarPage from "./pages/Calendar";
import Organization from "./pages/Organization";
import Reports from "./pages/Reports";
import ReportCreator from "./pages/ReportCreator";
import Discovery from "./pages/Discovery";
import Welcome from "./pages/Welcome";
import NotFound from "./pages/NotFound";

// Update the document title
document.title = "Fundsprout - Grant Management Solution";

const queryClient = new QueryClient();

const App = () => {
  // Check if this is a first-time user
  const isNewUser = localStorage.getItem('onboarding-completed') !== 'true';

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Redirect to welcome/onboarding for new users, otherwise to dashboard */}
            <Route path="/" element={isNewUser ? <Navigate to="/welcome" /> : <Index />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/discovery" element={<Discovery />} />
            <Route path="/find-grants" element={<FindGrants />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/grants/:id" element={<GrantDetail />} />
            <Route path="/calendar" element={<CalendarPage />} />
            <Route path="/organization" element={<Organization />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/reports/create/:id" element={<ReportCreator />} />
            <Route path="/reports/:id" element={<ReportCreator />} />
            <Route path="/apply/:id" element={<Applications />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
