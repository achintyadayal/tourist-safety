import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";
import DigitalIdPage from "./pages/DigitalIdPage";
import TouristAppPage from "./pages/TouristAppPage";
import Authorities from "./pages/Authorities";
import Alerts from "./pages/Alerts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Index />} />
            <Route path="digital-id" element={<DigitalIdPage />} />
            <Route path="tourist-app" element={<TouristAppPage />} />
            <Route path="dashboard" element={<Authorities />} />
            <Route path="alerts" element={<Alerts />} />
            <Route path="privacy" element={<Placeholder />} />
            <Route path="terms" element={<Placeholder />} />
            <Route path="security" element={<Placeholder />} />
          </Route>
          {/* Catch-all must remain last */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

import type { Root } from "react-dom/client";

const container = document.getElementById("root")!;
// Reuse a single root across HMR to avoid double createRoot warnings
const globalAny = globalThis as unknown as { __app_root?: Root };
if (!globalAny.__app_root) {
  globalAny.__app_root = createRoot(container);
}

globalAny.__app_root.render(<App />);
