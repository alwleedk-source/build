import { useState, useEffect } from "react";
import { useLocation, useSearch } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Lock, CheckCircle2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { APP_LOGO, APP_TITLE } from "@/const";

export default function ResetPassword() {
  const [, setLocation] = useLocation();
  const searchParams = new URLSearchParams(useSearch());
  const token = searchParams.get("token");
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Ongeldige wachtwoord reset link");
    }
  }, [token]);

  const resetPasswordMutation = trpc.admin.resetPassword.useMutation({
    onSuccess: () => {
      setSuccess(true);
      setIsLoading(false);
      // Redirect to login after 3 seconds
      setTimeout(() => {
        setLocation("/login");
      }, 3000);
    },
    onError: (error) => {
      setError(error.message || "Wachtwoord resetten mislukt");
      setIsLoading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("Ongeldige wachtwoord reset link");
      return;
    }

    if (newPassword.length < 8) {
      setError("Wachtwoord moet minimaal 8 tekens zijn");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Wachtwoorden komen niet overeen");
      return;
    }

    setIsLoading(true);
    resetPasswordMutation.mutate({ token, newPassword });
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="space-y-4 text-center">
            <div className="flex justify-center">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-green-600">Succesvol gewijzigd!</CardTitle>
              <CardDescription>
                Uw wachtwoord is opnieuw ingesteld
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-800 text-center">
                Uw wachtwoord is succesvol opnieuw ingesteld!
                <br />
                <br />
                U wordt over 3 seconden doorgestuurd naar de inlogpagina...
              </AlertDescription>
            </Alert>

            <Button
              onClick={() => setLocation("/login")}
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C5A028]"
            >
              Nu inloggen
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
            <CardTitle className="text-2xl font-bold">Wachtwoord opnieuw instellen</CardTitle>
            <CardDescription>
              Voer uw nieuwe wachtwoord in
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
              <Label htmlFor="newPassword">Nieuw wachtwoord</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="newPassword"
                  type="password"
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isLoading || !token}
                  className="pl-10"
                  required
                  minLength={8}
                />
              </div>
              <p className="text-xs text-gray-500">
                Wachtwoord moet minimaal 8 tekens zijn
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Bevestig wachtwoord</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isLoading || !token}
                  className="pl-10"
                  required
                  minLength={8}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C5A028] hover:from-[#C5A028] hover:to-[#B69121]"
              disabled={isLoading || !token}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Wijzigen...
                </>
              ) : (
                "Wachtwoord opnieuw instellen"
              )}
            </Button>

            <Button
              type="button"
              onClick={() => setLocation("/login")}
              className="w-full"
              variant="outline"
              disabled={isLoading}
            >
              Terug naar inloggen
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} {APP_TITLE}</p>
            <p className="mt-1">Alle rechten voorbehouden</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
