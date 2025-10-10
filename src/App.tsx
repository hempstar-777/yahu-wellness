import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Assessments from "./pages/Assessments";
import SurfaceIssuesAssessment from "./pages/SurfaceIssuesAssessment";
import BondagesAssessment from "./pages/BondagesAssessment";
import TraumaAssessment from "./pages/TraumaAssessment";
import GenerationalAssessment from "./pages/GenerationalAssessment";
import NewAgeAssessment from "./pages/NewAgeAssessment";
import AdvancedAssessment from "./pages/AdvancedAssessment";
import DoorwaysAssessment from "./pages/DoorwaysAssessment";
import EmotionsDictionary from "./pages/EmotionsDictionary";
import Courses from "./pages/Courses";
import NaturalHealingResources from "./pages/NaturalHealingResources";
import SpiritualTraumaResources from "./pages/SpiritualTraumaResources";
import Deliverance from "./pages/Deliverance";
import PreDeliverance from "./pages/PreDeliverance";
import StayingFree from "./pages/StayingFree";
import Prayers from "./pages/Prayers";
import Resources from "./pages/Resources";
import Teachings from "./pages/Teachings";
import ExpandedPrayers from "./pages/ExpandedPrayers";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import PrayerJournal from "./pages/PrayerJournal";
import Testimonies from "./pages/Testimonies";
import VIPBenefits from "./pages/VIPBenefits";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/assessments/surface-issues" element={<SurfaceIssuesAssessment />} />
          <Route path="/assessments/bondages" element={<BondagesAssessment />} />
          <Route path="/assessments/trauma" element={<TraumaAssessment />} />
          <Route path="/assessments/generational" element={<GenerationalAssessment />} />
          <Route path="/assessments/new-age" element={<NewAgeAssessment />} />
          <Route path="/assessments/advanced" element={<AdvancedAssessment />} />
          <Route path="/assessments/doorways" element={<DoorwaysAssessment />} />
          <Route path="/emotions" element={<EmotionsDictionary />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/natural-healing" element={<NaturalHealingResources />} />
          <Route path="/spiritual-trauma" element={<SpiritualTraumaResources />} />
          <Route path="/deliverance" element={<Deliverance />} />
          <Route path="/pre-deliverance" element={<PreDeliverance />} />
          <Route path="/staying-free" element={<StayingFree />} />
          <Route path="/prayers" element={<Prayers />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/teachings" element={<Teachings />} />
          <Route path="/expanded-prayers" element={<ExpandedPrayers />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/prayer-journal" element={<PrayerJournal />} />
          <Route path="/testimonies" element={<Testimonies />} />
          <Route path="/vip-benefits" element={<VIPBenefits />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
