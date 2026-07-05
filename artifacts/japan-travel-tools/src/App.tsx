import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import YenToTwd from "@/pages/yen-to-twd";
import JapanCardFee from "@/pages/japan-card-fee";
import ShoppingTripEstimator from "@/pages/shopping-trip-estimator";
import JapanTax8Vs10 from "@/pages/japan-tax-8-vs-10";
import JapanTax2026 from "@/pages/japan-tax-2026";
import JapanDutyFreeGuide from "@/pages/japan-duty-free-guide";
import JapanAirportTaxRefund from "@/pages/japan-airport-tax-refund";
import Guide from "@/pages/guide";
import About from "@/pages/about";
import Privacy from "@/pages/privacy";
import Contact from "@/pages/contact";

const queryClient = new QueryClient();

function LegacyHtmlRedirect() {
  const [location, navigate] = useLocation();

  useEffect(() => {
    if (!location.endsWith(".html")) return;

    let target = location.replace(/\.html$/, "");
    if (target === "" || target === "/index") {
      target = "/";
    }

    navigate(target, { replace: true });
  }, [location, navigate]);

  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/yen-to-twd" component={YenToTwd} />
      <Route path="/japan-card-fee" component={JapanCardFee} />
      <Route path="/shopping-trip-estimator" component={ShoppingTripEstimator} />
      <Route path="/japan-tax-8-vs-10" component={JapanTax8Vs10} />
      <Route path="/japan-tax-2026" component={JapanTax2026} />
      <Route path="/japan-duty-free-guide" component={JapanDutyFreeGuide} />
      <Route path="/japan-airport-tax-refund" component={JapanAirportTaxRefund} />
      <Route path="/guide" component={Guide} />
      <Route path="/about" component={About} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <LegacyHtmlRedirect />
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
