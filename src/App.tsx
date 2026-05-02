import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
import { AuthProvider } from "@/hooks/useAuth";
import RequireAdmin from "@/components/RequireAdmin";
import Index from "./pages/Index";
import About from "./pages/About";
import WhyEmpowerment from "./pages/WhyEmpowerment";
import WhoWeAre from "./pages/WhoWeAre";
import WhatWeDo from "./pages/WhatWeDo";
import WaysToGive from "./pages/WaysToGive";
import Media from "./pages/Media";
import ArticleDetail from "./pages/ArticleDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminGlobalSettings from "./pages/admin/AdminGlobalSettings";
import AdminMedia from "./pages/admin/AdminMedia";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminContent from "./pages/admin/AdminContent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route
              path="/admin"
              element={
                <RequireAdmin>
                  <AdminLayout />
                </RequireAdmin>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="global" element={<AdminGlobalSettings />} />
              <Route path="content" element={<AdminContent />} />
              <Route path="content/:page" element={<AdminContent />} />
              <Route path="media" element={<AdminMedia />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>

            <Route
              path="/*"
              element={
                <Layout>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/about-us" element={<About />} />
                    <Route path="/why-empowerment" element={<WhyEmpowerment />} />
                    <Route path="/who-we-are" element={<WhoWeAre />} />
                    <Route path="/what-we-do" element={<WhatWeDo />} />
                    <Route path="/ways-to-give" element={<WaysToGive />} />
                    <Route path="/ignite-potential" element={<WaysToGive />} />
                    <Route path="/media" element={<Media />} />
                    <Route path="/media/:slug" element={<ArticleDetail />} />
                    <Route path="/news" element={<Media />} />
                    <Route path="/news/:slug" element={<ArticleDetail />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Layout>
              }
            />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
