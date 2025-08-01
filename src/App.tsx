import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Loader from "./pages/Loader";
import ImageHover from "./pages/ImageHover";
import ImageGrid from "./pages/ImageGrid";
import Marquee from "./pages/Marquee";
import Team from "./pages/Team";
import Ripple from "./pages/Ripple";
import ScrollText from "./pages/ScrollText";
import Mystery from "./pages/Mystery";
import NotFound from "./pages/NotFound";
import BrutalistNavbar from "./components/BrutalistNavbar";
import CustomCursor from "./components/CustomCursor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CustomCursor />
        <BrutalistNavbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/loader" element={<Loader />} />
          <Route path="/image-hover" element={<ImageHover />} />
          <Route path="/image-grid" element={<ImageGrid />} />
          <Route path="/marquee" element={<Marquee />} />
          <Route path="/team" element={<Team />} />
          <Route path="/ripple" element={<Ripple />} />
          <Route path="/scroll-text" element={<ScrollText />} />
          <Route path="/mystery" element={<Mystery />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
