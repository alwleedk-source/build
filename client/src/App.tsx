import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SiteSettingsProvider } from "./contexts/SiteSettingsContext";
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
import Services from "@/pages/admin/Services";
import ServiceForm from "@/pages/admin/ServiceForm";
import BlogPosts from "@/pages/admin/BlogPosts";
import BlogPostForm from "@/pages/admin/BlogPostForm";
import Partners from "@/pages/admin/Partners";
import TestimonialsAdmin from "@/pages/admin/TestimonialsAdmin";
import ContactMessages from "@/pages/admin/ContactMessages";
import EmailSettings from "@/pages/admin/EmailSettings";
import HomeSettings from "@/pages/admin/HomeSettings";
import SettingsAdmin from "@/pages/admin/SettingsAdmin";
import AdminManagement from "@/pages/admin/AdminManagement";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Header from "./components/Header";
import AuthGuard from "./components/AuthGuard";

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
      <Route path="/admin">
        {() => <AuthGuard><Dashboard /></AuthGuard>}
      </Route>
      <Route path="/admin/projects">
        {() => <AuthGuard><Projects /></AuthGuard>}
      </Route>
      <Route path="/admin/projects/:id">
        {() => <AuthGuard><ProjectForm /></AuthGuard>}
      </Route>
      <Route path="/admin/services">
        {() => <AuthGuard><Services /></AuthGuard>}
      </Route>
      <Route path="/admin/services/:id">
        {() => <AuthGuard><ServiceForm /></AuthGuard>}
      </Route>
      <Route path="/admin/blog">
        {() => <AuthGuard><BlogPosts /></AuthGuard>}
      </Route>
      <Route path="/admin/blog/:id">
        {() => <AuthGuard><BlogPostForm /></AuthGuard>}
      </Route>
      <Route path="/admin/partners">
        {() => <AuthGuard><Partners /></AuthGuard>}
      </Route>
      <Route path="/admin/testimonials">
        {() => <AuthGuard><TestimonialsAdmin /></AuthGuard>}
      </Route>
      <Route path="/admin/messages">
        {() => <AuthGuard><ContactMessages /></AuthGuard>}
      </Route>
      <Route path="/admin/settings/email">
        {() => <AuthGuard><EmailSettings /></AuthGuard>}
      </Route>
      <Route path="/admin/settings/home">
        {() => <AuthGuard><HomeSettings /></AuthGuard>}
      </Route>
      <Route path="/admin/settings">
        {() => <AuthGuard><SettingsAdmin /></AuthGuard>}
      </Route>
      <Route path="/admin/admins">
        {() => <AuthGuard><AdminManagement /></AuthGuard>}
      </Route>
      <Route path="/login" component={Login} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/reset-password" component={ResetPassword} />
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
        <SiteSettingsProvider>
          <TooltipProvider>
            <Toaster />
            <Header />
            <Router />
          </TooltipProvider>
        </SiteSettingsProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
