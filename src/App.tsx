import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./layouts/DashboardLayout";
import NotFound from "./pages/NotFound";

// Import the new pages
import Auth from "./pages/Auth";
import Payment from "./pages/Payment";
import Deployment from "./pages/Deployment";
import Security from "./pages/Security";
import SEO from "./pages/SEO";
import Launch from "./pages/Launch";
import CustomerService from "./pages/CustomerService";
import Growth from "./pages/Growth";
import Settings from "./pages/Settings";
import Designs from "./pages/Designs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              {/* Dashboard routes */}
              <Route path="designs" element={<Designs />} />
              <Route path="auth" element={<Auth />} />
              <Route path="payment" element={<Payment />} />
              <Route path="deployment" element={<Deployment />} />
              <Route path="security" element={<Security />} />
              <Route path="seo" element={<SEO />} />
              <Route path="launch" element={<Launch />} />
              <Route path="customer-service" element={<CustomerService />} />
              <Route path="growth" element={<Growth />} />
              <Route path="settings" element={<Settings />} />
              <Route path="settings/:tab" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
