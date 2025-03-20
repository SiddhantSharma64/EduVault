import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Features from "./pages/Features";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Copyright from "./pages/Copyright";
import ScrollToHash from "./hooks/use-scroll-to-hash";
import { ThemeProvider } from "./components/theme-provider";
import FixNavigation from "./components/utils/fix-navigation";
import { ModalsProvider } from "./lib/context/ModalsContext";
import { useEffect } from "react";

const queryClient = new QueryClient();

// ScrollToTop component to reset scroll position on navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

const App = () => {
  // Enable smooth scrolling behavior for the entire app
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);
  
  return (
    <ThemeProvider defaultTheme="light" storageKey="eduvault-theme">
      <ModalsProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <ScrollToHash />
              <FixNavigation />
              <div className="relative overflow-hidden min-h-screen">
                {/* Background gradient orbs for visual interest */}
                <div className="fixed inset-0 -z-10 overflow-hidden opacity-30 pointer-events-none">
                  <div className="absolute top-[10%] right-[5%] w-[30rem] h-[30rem] rounded-full bg-primary/20 blur-[100px]" />
                  <div className="absolute bottom-[20%] left-[5%] w-[25rem] h-[25rem] rounded-full bg-secondary/20 blur-[100px]" />
                  <div className="absolute top-[40%] left-[40%] w-[20rem] h-[20rem] rounded-full bg-accent/20 blur-[100px]" />
                </div>
                
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/features" element={<Features />} />
                  <Route path="/terms" element={<TermsOfService />} />
                  <Route path="/privacy" element={<PrivacyPolicy />} />
                  <Route path="/copyright" element={<Copyright />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </ModalsProvider>
    </ThemeProvider>
  );
};

export default App;
