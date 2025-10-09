import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Assessments from "./pages/Assessments";
import SurfaceIssuesAssessment from "./pages/SurfaceIssuesAssessment";
import BondagesAssessment from "./pages/BondagesAssessment";
import TraumaAssessment from "./pages/TraumaAssessment";
import GenerationalAssessment from "./pages/GenerationalAssessment";
import NewAgeAssessment from "./pages/NewAgeAssessment";
import AdvancedAssessment from "./pages/AdvancedAssessment";
import Deliverance from "./pages/Deliverance";
import Prayers from "./pages/Prayers";
import Resources from "./pages/Resources";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/assessments/surface-issues" element={<SurfaceIssuesAssessment />} />
          <Route path="/assessments/bondages" element={<BondagesAssessment />} />
          <Route path="/assessments/trauma" element={<TraumaAssessment />} />
          <Route path="/assessments/generational" element={<GenerationalAssessment />} />
          <Route path="/assessments/new-age" element={<NewAgeAssessment />} />
          <Route path="/assessments/advanced" element={<AdvancedAssessment />} />
          <Route path="/deliverance" element={<Deliverance />} />
          <Route path="/prayers" element={<Prayers />} />
          <Route path="/resources" element={<Resources />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
