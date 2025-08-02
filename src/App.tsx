import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "./pages/Index";
import Loader from "./pages/Loader";
import ImageHover from "./pages/ImageHover";
import ImageGrid from "./pages/ImageGrid";
import Marquee from "./pages/Marquee";
import Team from "./pages/Team";
import ScrollText from "./pages/ScrollText";
import Mystery from "./pages/Mystery";
import NotFound from "./pages/NotFound";
import BrutalistNavbar from "./components/BrutalistNavbar";
import CustomCursor from "./components/CustomCursor";

const queryClient = new QueryClient();

const App = () => {
  const [isFirstVisit, setIsFirstVisit] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = sessionStorage.getItem('brutal-bloom-visited');
    
    if (!hasVisited) {
      // First visit - show loader
      setIsFirstVisit(true);
      // Mark as visited for this session
      sessionStorage.setItem('brutal-bloom-visited', 'true');
    } else {
      // Not first visit - go directly to home
      setIsFirstVisit(false);
    }
  }, []);

  // Show loading state while determining visit status
  if (isFirstVisit === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CustomCursor />
          <BrutalistNavbar />
          <Routes>
            <Route 
              path="/" 
              element={isFirstVisit ? <Navigate to="/loader" replace /> : <Index />} 
            />
            <Route path="/home" element={<Index />} />
            <Route path="/loader" element={<Loader />} />
            <Route path="/image-hover" element={<ImageHover />} />
            <Route path="/image-grid" element={<ImageGrid />} />
            <Route path="/marquee" element={<Marquee />} />
            <Route path="/team" element={<Team />} />
            <Route path="/scroll-text" element={<ScrollText />} />
            <Route path="/mystery" element={<Mystery />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
