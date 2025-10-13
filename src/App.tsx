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
import AltarsAssessment from "./pages/AltarsAssessment";
import IntercessionHub from "./pages/IntercessionHub";
import StayingFree from "./pages/StayingFree";
import Prayers from "./pages/Prayers";
import Resources from "./pages/Resources";
import Teachings from "./pages/Teachings";
import TeachingContent from "./pages/TeachingContent";
import ExpandedPrayers from "./pages/ExpandedPrayers";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import PrayerJournal from "./pages/PrayerJournal";
import Testimonies from "./pages/Testimonies";
import VIPBenefits from "./pages/VIPBenefits";
import Achievements from "./pages/Achievements";
import CourseExam from "./pages/CourseExam";
import PersonalizedRoadmap from "./pages/PersonalizedRoadmap";
import ProgressTracking from "./pages/ProgressTracking";
import FastingTracker from "./pages/FastingTracker";
import PrayerVideos from "./pages/PrayerVideos";
import GroupPrayer from "./pages/GroupPrayer";
import Forums from "./pages/Forums";
import MinisterToolkit from "./pages/MinisterToolkit";
import TermsOfService from "./pages/TermsOfService";
import DemonicHierarchy from "./pages/DemonicHierarchy";
import FastingGuide from "./pages/FastingGuide";
import SpiritualWarfareTraining from "./pages/SpiritualWarfareTraining";

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
          <Route path="/assessments/altars" element={<AltarsAssessment />} />
          <Route path="/intercession" element={<IntercessionHub />} />
          <Route path="/staying-free" element={<StayingFree />} />
          <Route path="/prayers" element={<Prayers />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/teachings" element={<Teachings />} />
          <Route path="/teaching/:id" element={<TeachingContent />} />
          <Route path="/expanded-prayers" element={<ExpandedPrayers />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/prayer-journal" element={<PrayerJournal />} />
          <Route path="/testimonies" element={<Testimonies />} />
          <Route path="/vip-benefits" element={<VIPBenefits />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/course-exam" element={<CourseExam />} />
          <Route path="/roadmap" element={<PersonalizedRoadmap />} />
          <Route path="/progress" element={<ProgressTracking />} />
          <Route path="/fasting" element={<FastingTracker />} />
          <Route path="/prayer-videos" element={<PrayerVideos />} />
          <Route path="/group-prayer" element={<GroupPrayer />} />
          <Route path="/forums" element={<Forums />} />
          <Route path="/minister-toolkit" element={<MinisterToolkit />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/demonic-hierarchy" element={<DemonicHierarchy />} />
          <Route path="/fasting-guide" element={<FastingGuide />} />
          <Route path="/spiritual-warfare-training" element={<SpiritualWarfareTraining />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;