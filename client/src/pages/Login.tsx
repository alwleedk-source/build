import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export default function Login() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple authentication - في الإنتاج يجب استخدام API
    if (username === "admin" && password === "BuildCraft2024!") {
      // حفظ session في localStorage
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("adminUser", username);
      
      toast.success("تم تسجيل الدخول بنجاح!");
      setLocation("/admin");
    } else {
      toast.error("اسم المستخدم أو كلمة المرور غير صحيحة");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">BuildCraft</h1>
            <p className="text-muted-foreground">Admin Dashboard</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2">
                Gebruikersnaam
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                autoComplete="username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">
                Wachtwoord
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Inloggen..." : "Inloggen"}
            </Button>
          </form>

          {/* Default Credentials Info */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground text-center">
              <strong>Standaard inloggegevens:</strong>
              <br />
              Gebruikersnaam: <code className="text-primary">admin</code>
              <br />
              Wachtwoord: <code className="text-primary">BuildCraft2024!</code>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setLocation("/")}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Terug naar home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
