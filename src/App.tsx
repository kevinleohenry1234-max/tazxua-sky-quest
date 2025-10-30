import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import { SkyQuestProvider } from './contexts/SkyQuestContext';
import { DataProvider } from './components/DataProvider';
import { lazy, Suspense } from 'react';
import LoadingSpinner from './components/LoadingSpinner';

// Eager load critical pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load non-critical pages
const Attractions = lazy(() => import("./pages/Attractions"));
const About = lazy(() => import("./pages/About"));
const Experience = lazy(() => import("./pages/Experience"));
const Explore = lazy(() => import("./pages/Explore"));
const Safety = lazy(() => import("./pages/Safety"));
const Contact = lazy(() => import("./pages/Contact"));
const Accommodation = lazy(() => import("./pages/Accommodation"));
const DigitalExhibition = lazy(() => import("./pages/DigitalExhibition"));
const ExhibitionMusic = lazy(() => import('@/pages/ExhibitionMusic'));
const ExhibitionCuisine = lazy(() => import('@/pages/ExhibitionCuisine'));
const ExhibitionAI = lazy(() => import('@/pages/ExhibitionAI'));
const ExhibitionGallery = lazy(() => import('@/pages/ExhibitionGallery'));
const ExploreExhibition = lazy(() => import('./pages/ExploreExhibition'));
const UserProfilePage = lazy(() => import('./pages/UserProfilePage'));
const ChallengesPage = lazy(() => import('./pages/ChallengesPage'));
const RewardShop = lazy(() => import('./pages/RewardShop'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const ReferralSystem = lazy(() => import('./pages/ReferralSystem'));
const PartnerDashboard = lazy(() => import('./pages/PartnerDashboard'));
const SkyQuestJourneyPage = lazy(() => import('./pages/SkyQuestJourneyPage'));
const HallOfStoriesPage = lazy(() => import('./pages/HallOfStoriesPage'));
const SouvenirPage = lazy(() => import('./pages/SouvenirPage'));
const FirstTimeVisitor = lazy(() => import('./pages/FirstTimeVisitor'));
const LearningPath = lazy(() => import('./pages/LearningPath'));
const ReturningUserDashboard = lazy(() => import('./pages/ReturningUserDashboard'));
const SkyQuest = lazy(() => import('./pages/SkyQuest'));
const SkyQuestCalm = lazy(() => import('./pages/SkyQuestCalm'));
const SkyQuestEnergetic = lazy(() => import('./pages/SkyQuestEnergetic'));
const Restaurant = lazy(() => import('./pages/Restaurant'));
const Tour = lazy(() => import('./pages/Tour'));
const Transport = lazy(() => import('./pages/Transport'));

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
            <Route path="/attractions" element={
              <Suspense fallback={<LoadingSpinner />}>
                <Attractions />
              </Suspense>
            } />
            <Route path="/about" element={
              <Suspense fallback={<LoadingSpinner />}>
                <About />
              </Suspense>
            } />
            <Route path="/experience" element={
              <Suspense fallback={<LoadingSpinner />}>
                <Experience />
              </Suspense>
            } />
            <Route path="/explore" element={
              <Suspense fallback={<LoadingSpinner />}>
                <Explore />
              </Suspense>
            } />
            <Route path="/safety" element={
              <Suspense fallback={<LoadingSpinner />}>
                <Safety />
              </Suspense>
            } />
            <Route path="/contact" element={
              <Suspense fallback={<LoadingSpinner />}>
                <Contact />
              </Suspense>
            } />
            <Route path="/accommodation" element={
              <Suspense fallback={<LoadingSpinner />}>
                <Accommodation />
              </Suspense>
            } />
            <Route path="/accommodation/restaurant" element={
              <Suspense fallback={<LoadingSpinner />}>
                <Restaurant />
              </Suspense>
            } />
            <Route path="/accommodation/tour" element={
              <Suspense fallback={<LoadingSpinner />}>
                <Tour />
              </Suspense>
            } />
            <Route path="/accommodation/transport" element={
              <Suspense fallback={<LoadingSpinner />}>
                <Transport />
              </Suspense>
            } />
            <Route path="/transport" element={
              <Suspense fallback={<LoadingSpinner />}>
                <Accommodation />
              </Suspense>
            } />
            <Route path="/sky-quest" element={
              <Suspense fallback={<LoadingSpinner />}>
                <SkyQuest />
              </Suspense>
            } />
            <Route path="/sky-quest/calm" element={
              <Suspense fallback={<LoadingSpinner />}>
                <SkyQuestCalm />
              </Suspense>
            } />
            <Route path="/sky-quest/energetic" element={
              <Suspense fallback={<LoadingSpinner />}>
                <SkyQuestEnergetic />
              </Suspense>
            } />
            <Route path="/skyquest" element={
              <Suspense fallback={<LoadingSpinner />}>
                <SkyQuest />
              </Suspense>
            } />
            <Route path="/trien-lam" element={
              <Suspense fallback={<LoadingSpinner />}>
                <DigitalExhibition />
              </Suspense>
            } />
            <Route path="/trien-lam/am-nhac" element={
              <Suspense fallback={<LoadingSpinner />}>
                <ExhibitionMusic />
              </Suspense>
            } />
            <Route path="/trien-lam/am-thuc" element={
              <Suspense fallback={<LoadingSpinner />}>
                <ExhibitionCuisine />
              </Suspense>
            } />
            <Route path="/trien-lam/sang-tao-ai" element={
              <Suspense fallback={<LoadingSpinner />}>
                <ExhibitionAI />
              </Suspense>
            } />
            <Route path="/exhibition-gallery" element={
              <Suspense fallback={<LoadingSpinner />}>
                <ExhibitionGallery />
              </Suspense>
            } />
            <Route path="/explore/exhibition" element={
              <Suspense fallback={<LoadingSpinner />}>
                <ExploreExhibition />
              </Suspense>
            } />
            <Route path="/profile" element={
              <Suspense fallback={<LoadingSpinner />}>
                <UserProfilePage />
              </Suspense>
            } />
            <Route path="/sky-quest/profile" element={
              <Suspense fallback={<LoadingSpinner />}>
                <UserProfilePage />
              </Suspense>
            } />
            <Route path="/challenges" element={
              <Suspense fallback={<LoadingSpinner />}>
                <ChallengesPage />
              </Suspense>
            } />
            <Route path="/sky-quest/challenges" element={
              <Suspense fallback={<LoadingSpinner />}>
                <ChallengesPage />
              </Suspense>
            } />
            <Route path="/sky-quest/journey" element={
              <Suspense fallback={<LoadingSpinner />}>
                <SkyQuestJourneyPage />
              </Suspense>
            } />
            <Route path="/sky-quest/hall-of-stories" element={
              <Suspense fallback={<LoadingSpinner />}>
                <HallOfStoriesPage />
              </Suspense>
            } />
            <Route path="/sky-quest/souvenirs" element={
              <Suspense fallback={<LoadingSpinner />}>
                <SouvenirPage />
              </Suspense>
            } />
            <Route path="/rewards" element={
              <Suspense fallback={<LoadingSpinner />}>
                <RewardShop />
              </Suspense>
            } />
            <Route path="/sky-quest/rewards" element={
              <Suspense fallback={<LoadingSpinner />}>
                <RewardShop />
              </Suspense>
            } />
            <Route path="/leaderboard" element={
              <Suspense fallback={<LoadingSpinner />}>
                <Leaderboard />
              </Suspense>
            } />
            <Route path="/sky-quest/leaderboard" element={
              <Suspense fallback={<LoadingSpinner />}>
                <Leaderboard />
              </Suspense>
            } />
            <Route path="/referral" element={
              <Suspense fallback={<LoadingSpinner />}>
                <ReferralSystem />
              </Suspense>
            } />
            <Route path="/partner-dashboard" element={
              <Suspense fallback={<LoadingSpinner />}>
                <PartnerDashboard />
              </Suspense>
            } />
            <Route path="/first-time-visitor" element={
              <Suspense fallback={<LoadingSpinner />}>
                <FirstTimeVisitor />
              </Suspense>
            } />
            <Route path="/learning-path" element={
              <Suspense fallback={<LoadingSpinner />}>
                <LearningPath />
              </Suspense>
            } />
            <Route path="/returning-dashboard" element={
              <Suspense fallback={<LoadingSpinner />}>
                <ReturningUserDashboard />
              </Suspense>
            } />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </SkyQuestProvider>
    </DataProvider>
  </QueryClientProvider>
);

export default App;
