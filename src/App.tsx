
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import FindGrants from "./pages/FindGrants";
import Applications from "./pages/Applications";
import GrantDetail from "./pages/GrantDetail";
import CalendarPage from "./pages/Calendar";
import Organization from "./pages/Organization";
import Reports from "./pages/Reports";
import ReportCreator from "./pages/ReportCreator";
import NotFound from "./pages/NotFound";

// Update the document title
document.title = "Fundsprout - Grant Management Solution";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/find-grants" element={<FindGrants />} />
          <Route path="/applications" element={<Applications />} />
          <Route path="/grants/:id" element={<GrantDetail />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/organization" element={<Organization />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/create/:id" element={<ReportCreator />} />
          <Route path="/reports/:id" element={<ReportCreator />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
