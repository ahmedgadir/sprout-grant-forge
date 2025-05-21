
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
            {/* Redirect to welcome/onboarding for new users, otherwise to discovery */}
            <Route path="/" element={isNewUser ? <Navigate to="/welcome" /> : <Navigate to="/discovery" />} />
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/discovery" element={<Discovery />} />
            {/* Catch-all route for 404s */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
