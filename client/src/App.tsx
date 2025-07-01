// Import routing components from wouter for SPA navigation
import { Switch, Route, Router } from "wouter";
// Import the React Query client for data fetching and caching
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
// Import UI providers for toasts, tooltips, and theming
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
// Import main page components
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import { ChatbotWidget } from "./components/chatbot-widget";
import BlogPage from "./pages/blog";
import BlogArticlePage from "./pages/blog-article";


// "/" for localhost (development), "/AmrishPortfolio" for GitHub Pages (production)
const base =
  window.location.hostname === "localhost" ? "/" : "/AmrishPortfolio";

// main router for the app, using correct base path 
function AppRouter() {
  return (
    <Router base={base}>

      <Switch>
        <Route path="/" component={Home} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/blog/:slug" component={BlogArticlePage} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}
// // The main app component, wrapping everything in providers for state, theming, and UI
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <AppRouter />
          <ChatbotWidget />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

