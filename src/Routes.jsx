import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import SellerPortal from './pages/seller-portal';
import BuyerDashboard from './pages/buyer-dashboard';
import Login from './pages/login';
import PlantTreeSponsorship from './pages/plant-tree-sponsorship';
import LandingPage from './pages/landing-page';
import CarbonCreditMarketplace from './pages/carbon-credit-marketplace';
import AdminConsole from './pages/admin-console';
import InvestorDashboard from './pages/investor-dashboard';
import SponsorDashboard from './pages/sponsor-dashboard';
import LearnAboutIzra from './pages/learn-about-izra';
import Tokenomics from './pages/tokenomics';
import InvestInIzra from './pages/invest-in-izra';
import SignUp from './pages/signup';
import RoleDashboardRouter from './components/ui/RoleDashboardRouter';


const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/landing-page" element={<LandingPage />} />
        <Route path="/learn-about-izra" element={<LearnAboutIzra />} />
        <Route path="/tokenomics" element={<Tokenomics />} />
        <Route path="/invest-in-izra" element={<InvestInIzra />} />
        <Route path="/carbon-credit-marketplace" element={<CarbonCreditMarketplace />} />
        <Route path="/plant-tree-sponsorship" element={<PlantTreeSponsorship />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes - role-based dashboards */}
        <Route path="/dashboard" element={<RoleDashboardRouter />} />
        <Route path="/admin-console" element={<AdminConsole />} />
        <Route path="/seller-portal" element={<SellerPortal />} />
        <Route path="/buyer-dashboard" element={<BuyerDashboard />} />
        <Route path="/investor-dashboard" element={<InvestorDashboard />} />
        <Route path="/sponsor-dashboard" element={<SponsorDashboard />} />

        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;