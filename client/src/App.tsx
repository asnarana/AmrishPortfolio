import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import { ChatbotWidget } from "./components/chatbot-widget";
import BlogPage from "./pages/blog";
import BlogArticlePage from "./pages/blog-article";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      {/* <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogArticlePage} /> */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
          <ChatbotWidget />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;

