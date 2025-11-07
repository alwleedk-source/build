import { useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
  children: React.ReactNode;
}

/**
 * AuthGuard component to protect admin routes
 * Redirects to /login if user is not authenticated
 */
export default function AuthGuard({ children }: AuthGuardProps) {
  const [, setLocation] = useLocation();
  const { data: user, isLoading, error } = trpc.auth.me.useQuery();

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!isLoading && (!user || error)) {
      setLocation("/login");
    }
  }, [user, isLoading, error, setLocation]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">جاري التحقق من الصلاحيات...</p>
        </div>
      </div>
    );
  }

  // If no user after loading, don't render children (will redirect)
  if (!user) {
    return null;
  }

  // User is authenticated, render children
  return <>{children}</>;
}
