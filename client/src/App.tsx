import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import ProjectsPage from "./pages/ProjectsPage";
import ServicesPage from "./pages/ServicesPage";
import OverOns from "./pages/OverOns";
import ServiceDetail from "./pages/ServiceDetail";
import BlogPage from "./pages/BlogPage";
import BlogPost from "./pages/BlogPost";
import AdminDashboard from "@/pages/AdminDashboard";
import Dashboard from "@/pages/admin/Dashboard";
import Projects from "@/pages/admin/Projects";
import ProjectForm from "@/pages/admin/ProjectForm";
import Login from "./pages/Login";
import Header from "./components/Header";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/projecten" component={ProjectsPage} />
      <Route path="/diensten" component={ServicesPage} />
      <Route path="/over-ons" component={OverOns} />
      <Route path="/diensten/:slug" component={ServiceDetail} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/admin" component={Dashboard} />
      <Route path="/admin/projects" component={Projects} />
      <Route path="/admin/projects/:id" component={ProjectForm} />
      <Route path="/login" component={Login} />
      <Route path="/404" component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Header />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
