import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { WizardProvider } from "@/contexts/WizardContext";
import { NavProvider } from "@/contexts/NavContext";
import { GlossaryProvider } from "@/contexts/GlossaryContext";
import { useHashLocation, isOfflineMode } from "@/lib/useHashLocation";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Wizard from "@/pages/Wizard";
import Results from "@/pages/Results";
import AllTests from "@/pages/AllTests";
import { FeedbackModal } from "@/components/FeedbackModal";
import CascadingFlow from "@/pages/CascadingFlow";
import Glossary from "@/pages/Glossary";

function ScrollToTop() {
  const [pathname] = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function Routes() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/wizard" component={Wizard} />
        <Route path="/results" component={Results} />
        <Route path="/browse" component={AllTests} />
        <Route path="/tree" component={CascadingFlow} />
        <Route path="/glossary" component={Glossary} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  const offlineMode = isOfflineMode();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={700}>
        <GlossaryProvider>
          <WizardProvider>
            <NavProvider>
              <Toaster />
              {offlineMode ? (
                <WouterRouter hook={useHashLocation}>
                  <Routes />
                </WouterRouter>
              ) : (
                <Routes />
              )}
              <FeedbackModal />
            </NavProvider>
          </WizardProvider>
        </GlossaryProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
