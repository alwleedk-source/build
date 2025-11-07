import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { APP_LOGO, APP_TITLE } from "@/const";

export default function ForgotPassword() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const forgotPasswordMutation = trpc.admin.forgotPassword.useMutation({
    onSuccess: () => {
      setSuccess(true);
      setIsLoading(false);
    },
    onError: (error) => {
      setError(error.message || "Verzenden van e-mail mislukt");
      setIsLoading(false);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email) {
      setError("Vul e-mailadres in");
      setIsLoading(false);
      return;
    }

    forgotPasswordMutation.mutate({ email });
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
              <CardTitle className="text-2xl font-bold text-green-600">Succesvol verzonden!</CardTitle>
              <CardDescription>
                Controleer uw e-mail
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">
                Een link om uw wachtwoord opnieuw in te stellen is naar uw e-mailadres verzonden.
                <br />
                <br />
                Controleer uw inbox (en spam map).
                <br />
                <br />
                <strong>Let op:</strong> De link is slechts 1 uur geldig.
              </AlertDescription>
            </Alert>

            <Button
              onClick={() => setLocation("/login")}
              className="w-full"
              variant="outline"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Terug naar inloggen
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
                <Mail className="h-8 w-8 text-white" />
              </div>
            )}
          </div>
          <div>
            <CardTitle className="text-2xl font-bold">Wachtwoord vergeten?</CardTitle>
            <CardDescription>
              Voer uw e-mailadres in en we sturen u een link om uw wachtwoord opnieuw in te stellen
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

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-[#D4AF37] to-[#C5A028] hover:from-[#C5A028] hover:to-[#B69121]"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verzenden...
                </>
              ) : (
                "Reset link verzenden"
              )}
            </Button>

            <Button
              type="button"
              onClick={() => setLocation("/login")}
              className="w-full"
              variant="outline"
              disabled={isLoading}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
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
