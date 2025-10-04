import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import SkipToContent from "./components/SkipToContent";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import Attractions from "./pages/Attractions";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Explore from "./pages/Explore";
import Safety from "./pages/Safety";
import Contact from "./pages/Contact";
import Accommodation from "./pages/Accommodation";

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <SkipToContent />
    <QueryClientProvider client={queryClient}>
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
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
