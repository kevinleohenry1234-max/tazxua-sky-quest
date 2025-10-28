import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { SkyQuestProvider } from './contexts/SkyQuestContext';
import { DataProvider } from './components/DataProvider';
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import Attractions from "./pages/Attractions";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Explore from "./pages/Explore";
import Safety from "./pages/Safety";
import Contact from "./pages/Contact";
import Accommodation from "./pages/Accommodation";
import DigitalExhibition from "./pages/DigitalExhibition";
import ExhibitionMusic from '@/pages/ExhibitionMusic';
import ExhibitionCuisine from '@/pages/ExhibitionCuisine';
import ExhibitionAI from '@/pages/ExhibitionAI';
import ExhibitionGallery from '@/pages/ExhibitionGallery';
import ExploreExhibition from './pages/ExploreExhibition';
import UserProfilePage from './pages/UserProfilePage';
import ChallengesPage from './pages/ChallengesPage';
import RewardShop from './pages/RewardShop';
import Leaderboard from './pages/Leaderboard';
import ReferralSystem from './pages/ReferralSystem';
import PartnerDashboard from './pages/PartnerDashboard';
import SkyQuestJourneyPage from './pages/SkyQuestJourneyPage';
import HallOfStoriesPage from './pages/HallOfStoriesPage';
import SouvenirPage from './pages/SouvenirPage';
import FirstTimeVisitor from './pages/FirstTimeVisitor';
import LearningPath from './pages/LearningPath';
import ReturningUserDashboard from './pages/ReturningUserDashboard';
import SkyQuest from './pages/SkyQuest';
import { SkyQuestCalm } from './pages/SkyQuestCalm';
import { SkyQuestEnergetic } from './pages/SkyQuestEnergetic';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DataProvider>
      <SkyQuestProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/attractions" element={<Attractions />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/safety" element={<Safety />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/accommodation" element={<Accommodation />} />
        <Route path="/transport" element={<Accommodation />} />
        <Route path="/sky-quest" element={<SkyQuest />} />
        <Route path="/sky-quest/calm" element={<SkyQuestCalm />} />
        <Route path="/sky-quest/energetic" element={<SkyQuestEnergetic />} />
        <Route path="/skyquest" element={<SkyQuest />} />
        <Route path="/trien-lam" element={<DigitalExhibition />} />
        <Route path="/trien-lam/am-nhac" element={<ExhibitionMusic />} />
        <Route path="/trien-lam/am-thuc" element={<ExhibitionCuisine />} />
        <Route path="/trien-lam/sang-tao-ai" element={<ExhibitionAI />} />
        <Route path="/exhibition-gallery" element={<ExhibitionGallery />} />
          <Route path="/explore/exhibition" element={<ExploreExhibition />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/sky-quest/profile" element={<UserProfilePage />} />
        <Route path="/challenges" element={<ChallengesPage />} />
        <Route path="/sky-quest/challenges" element={<ChallengesPage />} />
        <Route path="/sky-quest/journey" element={<SkyQuestJourneyPage />} />
        <Route path="/sky-quest/hall-of-stories" element={<HallOfStoriesPage />} />
        <Route path="/sky-quest/souvenirs" element={<SouvenirPage />} />
        <Route path="/rewards" element={<RewardShop />} />
        <Route path="/sky-quest/rewards" element={<RewardShop />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/sky-quest/leaderboard" element={<Leaderboard />} />
        <Route path="/referral" element={<ReferralSystem />} />
        <Route path="/partner-dashboard" element={<PartnerDashboard />} />
        <Route path="/first-time-visitor" element={<FirstTimeVisitor />} />
        <Route path="/learning-path" element={<LearningPath />} />
        <Route path="/returning-dashboard" element={<ReturningUserDashboard />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </SkyQuestProvider>
    </DataProvider>
  </QueryClientProvider>
);

export default App;
