import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Lock, Mail } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { APP_LOGO, APP_TITLE } from "@/const";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loginMutation = trpc.admin.login.useMutation({
    onSuccess: () => {
      setLocation("/admin");
    },
    onError: (error) => {
      setError(error.message || "Inloggen mislukt");
      setIsLoading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Vul e-mailadres en wachtwoord in");
      setIsLoading(false);
      return;
    }

    loginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            {APP_LOGO ? (
              <img src={APP_LOGO} alt={APP_TITLE} className="h-16 w-auto" />
            ) : (
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#C5A028] flex items-center justify-center">
                <Lock className="h-8 w-8 text-white" />
              </div>
            )}
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Inloggen</CardTitle>
            <CardDescription>
              {APP_TITLE} Dashboard
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">E-mailadres</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Wachtwoord</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setLocation("/forgot-password")}
                className="text-sm text-[#D4AF37] hover:text-[#C5A028] hover:underline"
                disabled={isLoading}
              >
                Wachtwoord vergeten?
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C5A028] hover:from-[#C5A028] hover:to-[#B69121]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Inloggen...
                </>
              ) : (
                "Inloggen"
              )}
            </Button>
          </form>

          <div className="mt-6 p-4 bg-muted rounded-lg text-center">
            <p className="text-sm text-muted-foreground">
              <strong>Standaard inloggegevens:</strong>
              <br />
              E-mail: <code className="text-primary">waleed.qodami@gmail.com</code>
              <br />
              Wachtwoord: <code className="text-primary">3505490qwE@@</code>
            </p>
          </div>

          <div className="mt-6 text-center">
            <button
              onClick={() => setLocation("/")}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              ← Terug naar home
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} {APP_TITLE}</p>
            <p className="mt-1">Alle rechten voorbehouden</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
