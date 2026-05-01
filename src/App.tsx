import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Layout from "@/components/Layout";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
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
            <Route path="/news" element={<Media />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
